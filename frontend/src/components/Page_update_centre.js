import axios from 'axios';
import { useEffect, useState } from 'react';

import Product_single_card_update from './Product_single_card_update.js';
import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const productEP = config.productEP;
const categoryEP = config.categoryEP;

export default function Page_update_centre(props) {

    const [productDetails, setProductDetails] = useState([]);
    const [productIdOptArr, setProductIdOptArr] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [catIdOptArr, setCatIdOptArr] = useState([]);
    const [focusProductId, setFocusProductId] = useState("-1");

    const [formInput, setFormInput] = useState({
        name: "",
        description: "",
        brand: "",
        imageurl: "",
        catid: "",
        productId: ""
    });

    useEffect(() => {
        console.log("Page_update_centre: use effect: execution: productEP: ", productEP);

        axios.get(productEP)
        .then(function (response)  {
            console.log("Page_update_centre: Products HTTP GET request succcess");
            console.log(response.data);
            setProductDetails(response.data);
            
            let optionArrTemp = [];
            const firstOpt = (<option key="product_opt_0" value="" id ="product_option_null">Select a product to update</option>);
            optionArrTemp.push(firstOpt);

            for(let i = 0; i < response.data.length; i++)
            {
                const oneItem = response.data[i];
                const productId = oneItem.productid;
                const productIdStr = productId.toString();
                const productName = oneItem.name;
                const genOptionArr = (
                    <option key={"product_opt_" + productIdStr} value={productIdStr} id={"product_option_" + productIdStr}>
                        { productIdStr + " : " + productName }
                    </option>
                );
                optionArrTemp.push(genOptionArr);
            }
            setProductIdOptArr(optionArrTemp);
        })
        .then(function () {
            console.log("Page_update_centre: use effect: part 2: Get Category: ");
            const retrivedJWT = localStorage.getItem('jwtToken');

            if(retrivedJWT.length !== 0)
            {
                axios.get(categoryEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
                .then(function (response) {
                    console.log("Page_update_centre: Category HTTP GET request succcess");
                    const responseArr = response.data;

                    setCategoryDetails(responseArr);
                    console.log(responseArr);

                    let optionArrTemp = [];
                    const firstOpt = (<option key="cat_option_0" value="">Select a category</option>);
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
                console.log(`Page_update_centre: use effect: part 2: No JWT to use`);
                alert('Failed to get retrieve category entries to populate display');
            } 
        })
        .catch(function (error) {
            console.log("Page_update_centre: use effect error:", error);
        });

    }, []);

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Update selected product</h6>
                            <form 
                                className="adminForm" 
                                id="productUpdateForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Page_update_centre: Form submitted successfully");
                                    console.log("Page_update_centre: Checking form input", formInput);

                                    const retrivedJWT = localStorage.getItem('jwtToken');
                                    if (retrivedJWT.length !== 0)
                                    {
                                        const updateProductEP = `${productEP}/${formInput.productId}`;
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

                                        const logMsg = `Page_update_centre: updating product Id: ${formInput.productId} on EP: ${updateProductEP}`;
                                        console.log(logMsg);
                                        axios.put(updateProductEP, reqBody, reqConfig)
                                        .then(function (response) { 
                                            console.log("Page_update_centre: Update product HTTP Put request succcess for product Id:", formInput.productId);
                                            console.log(response.data);
                                        })
                                        .then(function () { 
                                            // HTTP GET request for all products after product update HTTP PUT request success
                                            axios.get(productEP)
                                            .then(function (response) {
                                                console.log("Page_update_centre: Products HTTP GET request succcess");
                                                console.log(response.data);
                                                setProductDetails(response.data);
                                                
                                                let optionArrTemp = [];
                                                const firstOpt = (<option key="product_opt_0" value="" id ="product_option_null">Select a product to update</option>);
                                                optionArrTemp.push(firstOpt);

                                                for(let i = 0; i < response.data.length; i++)
                                                {
                                                    const oneItem = response.data[i];
                                                    const productId = oneItem.productid;
                                                    const productIdStr = productId.toString();
                                                    const productName = oneItem.name;
                                                    const genOptionArr = (
                                                        <option key={"product_opt_" + productIdStr} value={productIdStr} id={"product_option_" + productIdStr}>
                                                            { productIdStr + " : " + productName }
                                                        </option>
                                                    );
                                                    optionArrTemp.push(genOptionArr);
                                                }
                                                setProductIdOptArr(optionArrTemp);
                                            });
                                        })
                                        .catch(function (error) {
                                            let errorUserMsg = `Attempted action is unsuccessful. Following error has occured: ${error.message}`;
                                            console.log("Page_update_centre: Update product submit error:", error);
                                            alert(errorUserMsg);
                                        })
                                        .finally(function () { 
                                            setFormInput({
                                                name: "",
                                                description: "",
                                                brand: "",
                                                imageurl: "",
                                                catid: "",
                                                productId: ""		
                                            });
                                            setFocusProductId("-1");
                                        });
                                    }
                                    else
                                    {
                                        console.log("Page_update_centre: submit error: no jwt for HTTP request");
                                        const userErrorMsg = "Login credentials are missing to perform attempted action.";
                                        alert(userErrorMsg);
                                    }
                                }}
                            >
                                <div className="my-1">
                                    <label className="col-form-label">Product ID</label>             
                                    <select
                                        className="form-select filterSelect"
                                        id="productidProductUpdateInput"
                                        required
                                        value={formInput.productId}
                                        onChange={(e) => {
                                            //console.log("Select option: ", e.target.value);
                                            setFormInput((prev) => ({ ...prev, productId: e.target.value }));
                                            setFocusProductId(e.target.value);
                                            const productFilterArr = productDetails.filter(function(item) {
                                                const productId = item.productid;
                                                const productIdStr = productId.toString();
                                                return (productIdStr === e.target.value);
                                            });
                                            const productFiltered = productFilterArr[0];
                                            const productFilteredCatId = productFiltered.catid;
                                            const catIdStr = productFilteredCatId.toString();

                                            setFormInput({
                                                name: productFiltered.name,
                                                description: productFiltered.description,	
                                                brand: productFiltered.brand,
                                                imageurl: productFiltered.imageurl,
                                                catid: catIdStr,
                                                productId: e.target.value
                                            });
                                            //console.log("Page_update_centre: Select option: productFiltered: ", productFiltered);
                                        }}
                                    >
                                        {productIdOptArr}
                                    </select>
                                </div>                                
                                <div className="my-1">
                                    <label className="col-form-label">Product Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nameProductUpdateInput" 
                                        name="nameProductUpdateInput" 
                                        maxLength="50"
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
                                        id="descriptionProductUpdateText" 
                                        name="descriptionProductUpdateText"
                                        rows="2" 
                                        maxLength="100"
                                        required
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
                                        id="brandProductUpdateInput" 
                                        name="brandProductUpdateInput"
                                        maxLength="50"
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
                                        id="catidProductUpdateInput"
                                        required
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
                                        id="urlProductUpdateInput" 
                                        name="urlProductUpdateInput"
                                        maxLength="60"
                                        required 
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
                                    className="btn btn-primary"
                                    form="productUpdateForm"
                                    onClick={() => {
                                        console.log("Page_update_centre: update button clicked");

                                        let emptyKeysArr = [];
                                        for (const key in formInput) 
                                        {
                                            if (formInput[key].length === 0)
                                                emptyKeysArr.push(key);
                                        }

                                        if (emptyKeysArr.length !== 0)
                                        {
                                            let promptMsg = "Before clicking action button, please enter or select a value for the following form entries: ";
                                            for (let i = 0; i < emptyKeysArr.length; i++)
                                            {
                                                promptMsg += emptyKeysArr[i];
                                                if (i !== emptyKeysArr.length - 1)
                                                {
                                                    promptMsg += ", ";
                                                }
                                            }
                                            alert(promptMsg);
                                        }
                                    }}
                                >Update</button>                                
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
                            const productId = listItem.productid;
                            const productIdStr = productId.toString();
                            const setEnableFocus = (focusProductId === productIdStr);

                            return (
                                <Product_single_card_update 
                                    key={listItem.productid}
                                    item={listItem}
                                    listIndex={index}
                                    enableFocus={setEnableFocus}
                                ></Product_single_card_update>
                            );
                        })}
                    </div>
                </div>                                 
            </div>
        </div>
    );
}