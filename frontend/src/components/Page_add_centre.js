import axios from 'axios';
import { useEffect, useState } from 'react';

import Product_single_card from './Product_single_card.js';
import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const productEP = config.productEP;
const categoryEP = config.categoryEP;

export default function Page_add_centre(props) {

    const [formInput, setFormInput] = useState({
        name: '',
        description: '',
        brand: '',
        imageurl: '',
        catid: ''
    });
    const [productDetails, setProductDetails] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [catIdOptArr, setCatIdOptArr] = useState([]);

    useEffect(() => {
        console.log("Page_add_centre: use effect: execution: productEP: ", productEP);

        axios.get(productEP)
        .then(function (response)  {
            console.log("Page_add_centre: Products HTTP GET request succcess");
            setProductDetails(response.data);
            console.log(response.data);
        })
        .then(function () {
            console.log("Page_add_centre: use effect: part 2: Get Category: ");
            const retrivedJWT = localStorage.getItem('jwtToken');

            if(retrivedJWT.length !== 0)
            {
                axios.get(categoryEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
                .then(function (response) {
                    console.log("Page_add_centre: Category HTTP GET request succcess");
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
                console.log(`Page_add_centre: use effect: part 2: No JWT to use`);
                alert('Failed to get retrieve category entries to populate display');
            } 
        })
        .catch(function (error) {
            console.log("Page_add_centre: use effect error:", error);
        });
    }, []);
    //console.log("Page_add_centre: formInput:", formInput);
    
    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Add new product</h6>
                            <form 
                                className="adminForm" 
                                id="productAddForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Page_add_centre: Form submitted successfully");
                                    console.log("Page_add_centre: check submit formInput:", formInput);

                                    const retrivedJWT = localStorage.getItem('jwtToken');
                                    if (retrivedJWT.length !== 0)
                                    {
                                        const reqBody = {
                                            name: formInput.name,
                                            description: formInput.description,
                                            brand: formInput.brand,
                                            imageurl: formInput.imageurl,
                                            catid: formInput.catid	
                                        }
                                        const reqConfig = {
                                            headers: {
                                                "Content-Type": "application/json",
                                                "Authorization": `Bearer ${retrivedJWT}`
                                            }
                                        }
                                        
                                        axios.post(productEP, reqBody, reqConfig)
                                        .then(function (response) { 
                                            console.log("Page_add_centre: Add Product HTTP Post request succcess:");
                                            console.log(response.data);
                                        })
                                        .then(function () {
                                            // HTTP GET products after HTTP post create product
                                            axios.get(productEP)
                                            .then(function (response)  {
                                                console.log("Page_add_centre: Products HTTP GET request succcess");
                                                setProductDetails(response.data);
                                                console.log(response.data);
                                            })	
                                        })	
                                        .catch(function (error) {
                                            console.log("Page_add_centre: submit error:", error);
                                            const userErrorMsg = `Attempted action is unsuccessful, error: ${error.message}`;
                                            alert(userErrorMsg);
                                        })
                                        .finally(function () { 
                                            setFormInput({name: "", description: "", brand: "", imageurl: "", catid: ""});
                                        });
                                    }
                                    else
                                    {
                                        console.log("Page_add_centre: submit error: no jwt for HTTP request");
                                        const userErrorMsg = "Login credentials are missing to perform attempted action.";
                                        alert(userErrorMsg);
                                    }
                                }}
                            >
                                <div className="my-1">
                                    <label className="col-form-label">Product Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nameProductInput" 
                                        name="nameProductInput" 
                                        maxLength="25"
                                        required
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
                                        id="descriptionProductText" 
                                        name="descriptionProductText"
                                        rows="2" 
                                        maxLength="50"
                                        required
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
                                        id="brandProductInput" 
                                        name="brandProductInput"
                                        maxLength="25"
                                        required
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
                                        id="catidProductInput"
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
                                <div className="my-1">
                                    <label className="col-form-label">Product Image URL (name and file extension, e.g. image1.png)</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="urlProductInput" 
                                        name="urlProductInput"
                                        maxLength="30"
                                        required 
                                        placeholder="image1.png"
                                        value={formInput.imageurl}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, imageurl: e.target.value }));
                                        }}
                                    ></input>               
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
                                    form="productAddForm" 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Page_add_centre: add button clicked");

                                        const isEmptyName = formInput.name.length === 0;
                                        const isEmptyDescript = formInput.description.length === 0;
                                        const isEmptyBrand = formInput.brand.length === 0;
                                        const isEmptyUrl = formInput.imageurl.length === 0;
                                        //const isEmptyCatid = formInput.catid.length === 0;
                                        const anyEmptyInput = (isEmptyName || isEmptyDescript || isEmptyBrand || isEmptyUrl);

                                        if (anyEmptyInput)
                                        {
                                            alert('Please fill in all the form fields before clicking add');
                                        }
                                    }}
                                >Add</button>
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