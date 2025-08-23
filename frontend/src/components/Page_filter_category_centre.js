import axios from 'axios';
import { useEffect, useState } from 'react';

import Capstone_config from '../config/Capstone_config.js';
import Category_single_card from './Category_single_card.js';
const config = Capstone_config();
const categoryFilterEP = config.categoryFilterEP;
const categoryEP = config.categoryEP;

export default function Page_filter_category_centre(props) {

    const [formInput, setFormInput] = useState({
        catname: "",
        catdescription: "",
        catid: ""
    });

    const [categoryDetails, setCategoryDetails] = useState([]);
    const [catIdOptArr, setCatIdOptArr] = useState([]);
    

    useEffect(() => {
        console.log("Page_filter_category_centre: use effect: execution: categoryEP: ", categoryEP);

        // To do:  
        // 1) HTTP get request for categoryEP and if success setCategoryDetails and setCatIdOptArr
        // if 1) is done successfully, Category Entries will update with retrieved data, Category ID select input updated with options
        
        const retrivedJWT = localStorage.getItem('jwtToken');
        const reqConfig = {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${retrivedJWT}`
                            }
                }
       
        axios.get(categoryEP, reqConfig)
        .then(function (response)  {
            console.log("Page_filter_category_centre: Categories HTTP GET request succcess");
            setCategoryDetails(response.data);
            console.log(response.data);

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
        })
        .catch(function (error) {
            console.log("Page_filter_product_centre: use effect error:", error);
        });

    }, []);    

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Filter category by user input</h6>
                            <form 
                                className="adminForm"
                                id="categoryFilterForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Page_filter_category_centre: Form submitted successfully");
                                    console.log("Page_filter_category_centre: submit formInput:", formInput);
                                    console.log("Page_filter_product_centre: submit EP:", categoryFilterEP);

                                    // To do:  
                                    // 1) HTTP POST request for categoryFilterEP using reqBody and reqConfig with JWT 
                                    // and if success setCategoryDetails 
                                    // if 1) HTTP request success, Category Entries will updated with retrieved query data  
                                    // if 1) HTTP request 404, Category Entries will updated with blank array, alert user
                                        // swc start

                                    const retrivedJWT = localStorage.getItem('jwtToken');
                                    const reqConfig = {
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "Authorization": `Bearer ${retrivedJWT}`
                                                        }
                                            }
                                        const reqBody = {
                                            catname : formInput.catname,
                                            catdescription : formInput.catdescription,
                                            catid : formInput.catid	
                                        }

                                        console.log(reqBody);

                                        axios.post(categoryFilterEP, reqBody, reqConfig)
                                        .then(function (response)  {
                                            console.log("Page_filter_category_centre: Categories HTTP GET request succcess");
                                            setCategoryDetails(response.data);
                                            console.log(response.data);

                                            // let optionArrTemp = [];
                                            // const firstOpt = (<option key="cat_option_0" value="">No Selection</option>);
                                            //     optionArrTemp.push(firstOpt);
                                            //     const genOptionArr = response.data.map((item, index) => (
                                            //             <option key={"cat_option_" + item.catid.toString()} value={item.catid.toString()}>
                                            //                 { item.catid.toString() + " : " + item.catname }
                                            //             </option>
                                            //         ));
                                            //     optionArrTemp.push(...genOptionArr);

                                            //     setCatIdOptArr(optionArrTemp);
                                        })
                                        .catch(function (error) {
                                            setCategoryDetails([]);
                                            alert("No category found based on filter query");
                                            console.log("Page_filter_category_centre: post filter error:", error);
                                        });
                                        // swc end


                                }}
                            >
                                <div className="my-1">
                                    <label className="col-form-label">Category Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nameCategoryFilterInput" 
                                        name="nameCategoryFilterInput"
                                        maxLength="25"
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
                                        id="descriptionCategoryFilterText" 
                                        name="descriptionCategoryFilterText"
                                        rows="2" 
                                        maxLength="50"
                                        placeholder="Enter category description here"
                                        value={formInput.catdescription}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, catdescription: e.target.value }));
                                        }}
                                    ></textarea>
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">Category ID</label>             
                                    <select
                                        className="form-select filterSelect"
                                        id="catidCategoryFilterInput"
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
                                    form="categoryFilterForm"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Page_filter_category_centre: filter button clicked");

                                    }}
                                >Filter</button>                                
                            </div>
                            <div className="row my-3 d-grid px-2">
                               <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Page_filter_category_centre: reset button: clicked");
                                        // To do:  
                                        // 1) HTTP get request for categoryEP and if success setCategoryDetails and setCatIdOptArr
                                        // if 1) is done successfully, Category Entries will update with retrieved data, Category ID select input updated with options
                                        // axios get, .then, .catch, .finally
                                        // .catch: handle error
                                        // .finally: setFormInput({catname: "", catdescription: "", catid: ""});
                                
                                const retrivedJWT = localStorage.getItem('jwtToken');
                                const reqConfig = {
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        "Authorization": `Bearer ${retrivedJWT}`
                                                    }
                                        }
                            
                                axios.get(categoryEP, reqConfig)
                                .then(function (response)  {
                                    console.log("Page_filter_category_centre: Categories HTTP GET request succcess");
                                    setCategoryDetails(response.data);
                                    console.log(response.data);
                                })
                                .catch(function (error) {
                                    console.log("Page_filter_product_centre: use effect error:", error);
                                })
                                .finally(function () {setFormInput({catname: "", catdescription: "", catid: ""})});
                                }
                            }
                                >Reset filter</button>                                
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