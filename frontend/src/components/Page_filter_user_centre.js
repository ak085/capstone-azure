import axios from 'axios';
import { useEffect, useState } from 'react';

import User_single_card from './User_single_card.js';
import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const userAllEP = config.userAllEP;
const userFilterEP = config.userFilterEP;

export default function Page_filter_user_centre(props) {

    const [formInput, setFormInput] = useState({
        name: "",
        email: "",
        role: "",
        userid: ""
    });

    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        console.log(`Page_filter_user_centre: use effect: execution:`, userAllEP);

        // To do:  
        // 1) HTTP get request for userAllEP and if success setUserDetails 
        // if 1) is done successfully, User Entries will update with retrieved data     

    }, []);

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Filter users by user input</h6>
                            <form 
                                className="adminForm"
                                id="userFilterForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Page_filter_user_centre: Form submitted successfully");
                                    console.log("Page_filter_user_centre: submit formInput:", formInput);
                                    console.log("Page_filter_user_centre: submit EP:", userFilterEP);

                                    // To do:  
                                    // 1) HTTP POST request for userFilterEP using reqBody and reqConfig with JWT 
                                    // and if success setUserDetails 
                                    // if 1) HTTP request success, user Entries will updated with retrieved query data  
                                    // if 1) HTTP request 404, user Entries will updated with blank array, alert user

                                }}
                            >
                                <div className="my-1">
                                    <label className="col-form-label">User Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nameUserFilterInput" 
                                        name="nameUserFilterInput"
                                        maxLength="25"
                                        value={formInput.name}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, name: e.target.value }));
                                        }}
                                    ></input>                          
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">User Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="emailUserFilterInput" 
                                        name="emailUserFilterInput"
                                        maxLength="25"
                                        value={formInput.email}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, email: e.target.value }));
                                        }}
                                    ></input>                          
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">Category ID</label>             
                                    <select
                                        className="form-select filterSelect"
                                        id="roleUserFilterInput"
                                        value={formInput.role}
                                        onChange={(e) => {
                                            console.log("User role select option: ", e.target.value);
                                            console.log("User role Select option: ", typeof e.target.value);
                                            setFormInput((prev) => ({ ...prev, role: e.target.value }));
                                        }}				
                                    >
                                        <option value="">No Selection</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Member">Member</option>
                                    </select>
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">User Id</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="userIdFilterInput" 
                                        name="userIdFilterInput"
                                        min="1" 
                                        max="9999"
                                        step="1"
                                        value={formInput.userid}
                                        onChange={(e) => {
                                            console.log("user id number input: ", e.target.value);
                                            console.log("user id number input: ", typeof e.target.value);
                                            setFormInput((prev) => ({ ...prev, userid: e.target.value }));
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
                                    form="userFilterForm"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Page_filter_user_centre: filter button clicked");


                                    }}
                                >Filter</button>                                
                            </div>
                            <div className="row my-3 d-grid px-2">
                               <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Page_filter_user_centre: reset button: clicked");
                                        // To do:  
                                        // 1) HTTP get request for userAllEP and if success setUserDetails 
                                        // if 1) is done successfully, User Entries will update with retrieved data
                                        // axios get, .then, .catch, .finally
                                        // .catch: handle error
                                        // .finally: setFormInput({name: "", email: "", role: "", userid: ""});

                                    }}
                                >Reset filter</button>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-2">
                <div className="alert alert-warning text-center mt-4 fw-bold" role="alert">
                    User Entries
                </div>
                <div className="container">
                    <div className="row mt-2 mb-4">
                        {userDetails.map(function (listItem, index) {
                            return (
                                <User_single_card 
                                    key={listItem.userid}
                                    item={listItem}
                                    listIndex={index}
                                ></User_single_card>
                            );
                        })}
                    </div>
                </div>                                 
            </div>
        </div>
    );
}