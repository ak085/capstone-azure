import axios from 'axios';
import { useEffect, useState } from 'react';

import Product_single_card from './Product_single_card.js';
import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const productEP = config.productEP;
const productFilterEP = config.productFilterEP;
const categoryEP = config.categoryEP;

export default function Page_filter_product_centre(props) {

    const [formInput, setFormInput] = useState({
        name: "",
        description: "",
        brand: "",
        catid: ""
    });

    const [productDetails, setProductDetails] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [catIdOptArr, setCatIdOptArr] = useState([]);

    useEffect(() => {
        console.log("Page_filter_product_centre: use effect: execution: productEP: ", productEP);

        axios.get(productEP)
        .then(function (response)  {
            console.log("Page_filter_product_centre: Products HTTP GET request succcess");
            setProductDetails(response.data);
            console.log(response.data);
        })
        .then(function () {
            console.log("Page_filter_product_centre: use effect: part 2: Get Category: ");
            const retrivedJWT = localStorage.getItem('jwtToken');

            if(retrivedJWT.length !== 0)
            {
                axios.get(categoryEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
                .then(function (response) {
                    console.log("Page_filter_product_centre: Category HTTP GET request succcess");
                    const responseArr = response.data;

                    setCategoryDetails(responseArr);
                    console.log(responseArr);

                    let optionArrTemp = [];
                    const firstOpt = (<option key="cat_option_0" value="">No Selection</option>);
                    optionArrTemp.push(firstOpt);
                    const genOptionArr = response.data.map((item, index) => (
                        <option key={"cat_option_" + item.catid.toString()} value={item.catid.toString()}>
                            { item.catid.toString() + " : " + item.catname }
                        </option>
                    ));
                    optionArrTemp.push(...genOptionArr);

                    setCatIdOptArr(optionArrTemp);
                });
            }
            else
            {
                console.log(`Page_filter_product_centre: use effect: part 2: No JWT to use`);
                alert('Failed to get retrieve category entries to populate display');                
            }

        })
        .catch(function (error) {
            console.log("Page_filter_product_centre: use effect error:", error);
        });
        
    }, []);

    //console.log("Page_filter_product_centre: formInput:", formInput);

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Filter products by user input</h6>
                            <form 
                                className="adminForm"
                                id="productFilterForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Page_filter_product_centre: Form submitted successfully");
                                    console.log("Page_filter_product_centre: submit formInput:", formInput);
                                    console.log("Page_filter_product_centre: submit EP:", productFilterEP);

                                    const reqBody = {
                                        name: formInput.name,
                                        description: formInput.description,
                                        brand: formInput.brand,
                                        catid: formInput.catid	
                                    }

                                    console.log("Page_filter_product_centre: submit reqBody:", reqBody);

                                    axios.post(productFilterEP, reqBody)
                                    .then(function (response) { 
                                        console.log("Page_filter_product_centre: Filter Product HTTP Get request succcess:");
                                        console.log(response.data);
                                        setProductDetails(response.data);
                                    })                                 
                                    .catch(function (error) {
                                        
                                        if (error.response) 
                                        {
                                            if (error.response.status === 404) 
                                            {
                                                console.log("Page_filter_product_centre: Filter Product HTTP 404 error: ", error.response.data.message);
                                                setProductDetails([]);
                                                alert("No product found based on filter query");
                                            }
                                            else 
                                            {
                                                console.log("Page_filter_product_centre: Filter Product other HTTP status error: ", error);
                                            }
                                        }
                                        else 
                                        {
                                            console.log("Page_filter_product_centre: Filter Product HTTP Get request error:", error);
                                        }
                                    });
                                }}
                            >
                                <div className="my-1">
                                    <label className="col-form-label">Product Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nameProductFilterInput" 
                                        name="nameProductFilterInput"
                                        maxLength="25"
                                        value={formInput.name}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, name: e.target.value }));
                                        }}
                                    ></input>                          
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">Product Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="descriptionProductFilterText" 
                                        name="descriptionProductFilterText"
                                        rows="2" 
                                        maxLength="50"
                                        placeholder="Enter product description here"
                                        value={formInput.description}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, description: e.target.value }));
                                        }}
                                    ></textarea>
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">Product Brand</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="brandProductFilterInput" 
                                        name="brandProductFilterInput"
                                        maxLength="25"
                                        value={formInput.brand}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, brand: e.target.value }));
                                        }}
                                    ></input>                    
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">Product Category ID</label>             
                                    <select
                                        className="form-select filterSelect"
                                        id="catidProductFilterInput"
                                        value={formInput.catid}
                                        onChange={(e) => {
                                            //console.log("Select option: ", e.target.value)
                                            //console.log("Select option: ", typeof e.target.value)
                                            setFormInput((prev) => ({ ...prev, catid: e.target.value }));
                                        }}				
                                    >
                                        {catIdOptArr}
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Action</h6>
                            <div className="row my-3 d-grid px-2">
                               <button 
                                    type="submit" 
                                    form="productFilterForm"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Page_filter_product_centre: filter button clicked");

                                    }}
                                >Filter</button>
                            </div>
                            <div className="row my-3 d-grid px-2">
                               <button 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Page_filter_product_centre: reset button: clicked");

                                        axios.get(productEP)
                                        .then(function (response)  {
                                            console.log("Page_filter_product_centre: reset button: Products HTTP GET request succcess");
                                            setProductDetails(response.data);
                                            console.log(response.data);
                                        })
                                        .then(function () {
                                            console.log("Page_filter_product_centre: reset button: part 2: Get Category: ");
                                            const retrivedJWT = localStorage.getItem('jwtToken');

                                            if(retrivedJWT.length !== 0)
                                            {
                                                axios.get(categoryEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
                                                .then(function (response) {
                                                    console.log("Page_filter_product_centre: reset button: Category HTTP GET request succcess");
                                                    const responseArr = response.data;

                                                    setCategoryDetails(responseArr);
                                                    console.log(responseArr);

                                                    let optionArrTemp = [];
                                                    const firstOpt = (<option key="cat_option_0" value="">No Selection</option>);
                                                    optionArrTemp.push(firstOpt);
                                                    const genOptionArr = response.data.map((item, index) => (
                                                        <option key={"cat_option_" + item.catid.toString()} value={item.catid.toString()}>
                                                            { item.catid.toString() + " : " + item.catname }
                                                        </option>
                                                    ));
                                                    optionArrTemp.push(...genOptionArr);

                                                    setCatIdOptArr(optionArrTemp);
                                                });
                                            }
                                            else
                                            {
                                                console.log(`Page_filter_product_centre: reset button: part 2: No JWT to use`);
                                                alert('Failed to get retrieve category entries to populate display');             
                                            }

                                        })
                                        .catch(function (error) {
                                            console.log("Page_filter_product_centre: reset button: error:", error);
                                        })
                                        .finally(function () {
                                            setFormInput({name: "", description: "", brand: "", catid: ""});
                                        });
                                    }}
                                >Reset Filter</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-2">
                <div className="alert alert-warning text-center mt-4 fw-bold" role="alert">
                    Product Entries
                </div>
                <div className="container">
                    <div className="row mt-2 mb-4">
                        {productDetails.map(function (listItem, index) {
                            return (
                                <Product_single_card 
                                    key={listItem.productid}
                                    item={listItem}
                                    listIndex={index}
                                ></Product_single_card>
                            );
                        })}
                    </div>
                </div>                                 
            </div>
        </div>
    );
}