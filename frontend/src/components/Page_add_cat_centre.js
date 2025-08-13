import axios from 'axios';
import { useEffect, useState } from 'react';

import Capstone_config from '../config/Capstone_config.js';
import Category_single_card from './Category_single_card.js';
const config = Capstone_config();
const categoryEP = config.categoryEP;

export default function Page_add_cat_centre(props) {

    const [categoryDetails, setCategoryDetails] = useState([]);
    const [formInput, setFormInput] = useState({
        catname: '',
        catdescription: ''
    });

    useEffect(() => {
        console.log("Page_add_cat_centre: use effect: execution: categoryEP: ", categoryEP);
        // To do: add code for category HTTP get for page first render
        // after successful category HTTP get, setCategoryDetails(response.data)
        // if done correct, the Category Entries display at page bottom will populate
        
        // swc added start
        const retrivedJWT = localStorage.getItem('jwtToken');
        const reqConfig = {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${retrivedJWT}`
                            }
}
        axios.get(categoryEP, reqConfig)
        .then(function (response)  {
            console.log("Page_add_cat_centre: Categories HTTP GET request succcess");
            setCategoryDetails(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log("Page_add_cat_centre: use effect error:", error);
        });
        // swc added end
    }, []); 

    console.log("Page_add_cat_centre: categoryDetails:", categoryDetails);

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Add new category</h6>
                            <form
                                className="adminForm" 
                                id="categoryAddForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Page_add_cat_centre: Form submitted successfully");
                                    console.log("Page_add_cat_centre: check submit formInput:", formInput);

                                    const retrivedJWT = localStorage.getItem('jwtToken');
                                    if (retrivedJWT.length !== 0)
                                    {
                                        // To do: add code for Add category HTTP post, followed by category HTTP get
                                        // after successful category HTTP get, setCategoryDetails(response.data)
                                        // if done correct, the Category Entries display at page bottom will populate
                                        // swc added start
                                        const reqBody = {
                                            name: formInput.catname,
                                            description: formInput.catdescription
                                        }
                                        const reqConfig = {
                                            headers: {
                                                "Content-Type": "application/json",
                                                "Authorization": `Bearer ${retrivedJWT}`
                                            }
                                        }

                                        axios.post(categoryEP, reqBody, reqConfig)
                                                .then(function (response)  {
                                                    console.log("Page_add_cat_centre: Categories HTTP post request succcess");
                                                   // setCategoryDetails(response.data);
                                                    console.log(response.data);
                                                })
                                                .then(function () {
                                            // HTTP GET products after HTTP post create product
                                                                                    const reqBody = {
                                            name: formInput.catname,
                                            description: formInput.catdescription
                                        }
                                        const reqConfig = {
                                            headers: {
                                                "Content-Type": "application/json",
                                                "Authorization": `Bearer ${retrivedJWT}`
                                            }
                                        }
                                                        axios.get(categoryEP, reqConfig)
                                                        .then(function (response)  {
                                                            console.log("Page_add_centre: Category HTTP GET request succcess");
                                                            setCategoryDetails(response.data);
                                                            console.log(response.data);
                                                        })	
                                                    })	
                                                .catch(function (error) {
                                                    console.log("Page_add_cat_centre: use effect error:", error);
                                                });

                                        // swc added end
                                    }
                                    else
                                    {
                                        console.log("Page_add_cat_centre: submit error: no jwt for HTTP request");
                                        const userErrorMsg = "Login credentials are missing to perform attempted action.";
                                        alert(userErrorMsg);
                                    }
                                }}
                            >
                                <div className="my-1">
                                    <label className="col-form-label">Category Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nameCategoryInput" 
                                        name="nameCategoryInput" 
                                        maxLength="30"
                                        required
                                        value={formInput.catname}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, catname: e.target.value }));
                                        }}
                                    ></input>                          
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">Category Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="descriptionCategoryText" 
                                        name="descriptionCategoryText"
                                        rows="2" 
                                        maxLength="60"
                                        required
                                        placeholder="Enter category description here"
                                        value={formInput.catdescription}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, catdescription: e.target.value }));
                                        }}
                                    ></textarea>
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
                                    form="categoryAddForm"
                                    onClick={() => {
                                        console.log("Page_add_cat_centre: add button clicked");
                                        
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
                                >Add</button>                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-2">
                <div className="alert alert-warning text-center mt-4 fw-bold" role="alert">
                    Category Entries
                </div>
                <div className="container">
                    <div className="row mt-2 mb-4">
                        {categoryDetails.map(function (listItem, index) {
                            return (
                                <Category_single_card 
                                    key={listItem.catid}
                                    item={listItem}
                                    listIndex={index}
                                ></Category_single_card>
                            );
                        })}
                    </div>
                </div>                                 
            </div>
        </div>
    );
}