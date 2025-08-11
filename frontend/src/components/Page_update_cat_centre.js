import axios from 'axios';
import { useEffect, useState } from 'react';

import Category_single_card_update from './Category_single_card_update.js';
import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const categoryEP = config.categoryEP;

export default function Page_update_cat_centre(props) {

    const [categoryDetails, setCategoryDetails] = useState([]);
    const [catIdOptArr, setCatIdOptArr] = useState([]);
    const [focusCatId, setFocusCatId] = useState("-1");

    const [formInput, setFormInput] = useState({
        catid: "",
        catname: "",
        catdescription: ""
    });

    useEffect(() => {
        console.log("Page_update_cat_centre: use effect: execution: categoryEP: ", categoryEP);
        const retrivedJWT = localStorage.getItem('jwtToken');

        if(retrivedJWT.length !== 0)
        {
            axios.get(categoryEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
            .then(function (response) {
                console.log("Page_update_cat_centre: Category HTTP GET request succcess");
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
            })
            .catch(function (error) {
                console.log("Page_update_centre: use effect error:", error);
            });    
        }
        else
        {
            console.log(`Page_update_cat_centre: use effect: part 2: No JWT to use`);
            alert('Failed to get retrieve category entries to populate display');            
        }

    }, []);

    console.log("Page_update_cat_centre: categoryDetails:", categoryDetails);

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Update existing category</h6>
                            <form
                                className="adminForm" 
                                id="categoryUpdateForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Page_update_cat_centre: Form submitted successfully");
                                    console.log("Page_update_cat_centre: check submit formInput:", formInput);

                                    const retrivedJWT = localStorage.getItem('jwtToken');
                                    if (retrivedJWT.length !== 0)
                                    {
                                        // To do: add code for Update category HTTP put, followed by category HTTP get
                                        // after successful category HTTP get, setCategoryDetails(response.data)
                                        // if done correct, the Category Entries display at page bottom will populate

                                    }
                                    else
                                    {
                                        console.log("Page_update_cat_centre: submit error: no jwt for HTTP request");
                                        const userErrorMsg = "Login credentials are missing to perform attempted action.";
                                        alert(userErrorMsg);
                                    }
                                }}
                            >
                                <div className="my-1">
                                    <label className="col-form-label">Category ID</label>             
                                    <select
                                        className="form-select filterSelect"
                                        id="catidCategoryUpdateInput"
                                        required
                                        value={formInput.catid}
                                        onChange={(e) => {
                                            //console.log("Select option: ", e.target.value)
                                            //console.log("Select option: ", typeof e.target.value)
                                            //setFormInput((prev) => ({ ...prev, catid: e.target.value }));

                                            setFocusCatId(e.target.value);
                                            const categoryFilterArr = categoryDetails.filter(function(item) {
                                                const catId = item.catid;
                                                const catIdStr = catId.toString();
                                                return (catIdStr === e.target.value);
                                            });
                                            const categoryFiltered = categoryFilterArr[0];
                                            setFormInput({
                                                catid: e.target.value,
                                                catname: categoryFiltered.catname,
                                                catdescription: categoryFiltered.catdescription
                                            });

                                        }}				
                                    >
                                        {catIdOptArr}
                                    </select>
                                </div>                                
                                <div className="my-1">
                                    <label className="col-form-label">Category Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nameCategoryUpdateInput" 
                                        name="nameCategoryUpdateInput" 
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
                                        id="descriptionCategoryUpdateText" 
                                        name="descriptionCategoryUpdateText"
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
                                    form="categoryUpdateForm"
                                    onClick={() => {
                                        console.log("Page_update_cat_centre: update button clicked");
                                        
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
                    Category Entries
                </div>
                <div className="container">
                    <div className="row mt-2 mb-4">
                        {categoryDetails.map(function (listItem, index) {
                            const catId = listItem.catid;
                            const catIdStr = catId.toString();
                            const setEnableFocus = (focusCatId === catIdStr);

                            return (
                                <Category_single_card_update 
                                    key={listItem.catid}
                                    item={listItem}
                                    listIndex={index}
                                    enableFocus={setEnableFocus}
                                ></Category_single_card_update>
                            );
                        })}
                    </div>
                </div>                                 
            </div>
        </div>
    );
}