import axios from 'axios';
import { useEffect, useState } from 'react';

import { useDispatch  } from 'react-redux';
import { updateLogin } from '../store/settingSlice.js';

import User_single_card from './User_single_card.js';
import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const userAllEP = config.userAllEP;
const userRegisterEP = config.userRegisterEP;

export default function Page_user_register_centre(props) {

    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [userDetails, setUserDetails] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`Page_user_register_centre: use effect: execution: `);
        const retrivedJWT = localStorage.getItem('jwtToken');
        
        if(retrivedJWT.length !== 0)
        {
            axios.get(userAllEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
            .then(function (response) {
                console.log("Page_user_register_centre: User HTTP GET request succcess");
                setUserDetails(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("Page_user_register_centre: use effect error:", error);
                alert('Failed to get retrieve user entries to populate display');
            });
        }
        else
        {
            console.log(`Page_user_register_centre: use effect: No JWT to use`);
            alert('Failed to get retrieve user entries to populate display');
        }
    }, []);

    //console.log("Page_user_register_centre: formInput:", formInput);
    //console.log("Page_user_register_centre: userRegisterEP:", userRegisterEP);

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Register new admin user</h6>
                            <form 
                                id="userRegisterForm"
                                className="adminForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Page_user_register_centre: Form submitted successfully");
                                    // HTTP post with JSON body no JWT required
                                    axios.post(userRegisterEP, {
                                        name: formInput.name,
                                        email: formInput.email,
                                        password: formInput.password
                                    })
                                    .then(function (response) {
                                        console.log("Page_user_register_centre: User register HTTP Post success, JWT:", response.data.token);
                                        const retrivedJWT = localStorage.getItem('jwtToken');
                                        
                                        if(retrivedJWT.length.length === 0)
                                        {
                                            const jwtToken = response.data.token;
                                            const jwtUpdateTime = new Date();
                                            localStorage.setItem('jwtToken', jwtToken);
                                            localStorage.setItem('jwtToken_time', jwtUpdateTime.toLocaleString());
                                            localStorage.setItem('jwtToken_user', formInput.email);
                                            // dispatch to slice reducer
                                            const dispatchPayload = {setLogin: true, email: formInput.email, password: formInput.password, loginTime: jwtUpdateTime.toLocaleString()};
                                            dispatch( updateLogin(dispatchPayload) );
                                        }
                                    })
                                    .then(function () {	
                                        console.log("Page_user_register_centre: after register: Get Users: ");
                                        const retrivedJWT = localStorage.getItem('jwtToken');

                                        if(retrivedJWT.length.length !== 0)
                                        {
                                            axios.get(userAllEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
                                            .then(function (response) {
                                                console.log("Page_user_register_centre: User HTTP GET request succcess");
                                                setUserDetails(response.data);
                                                console.log(response.data);
                                            });
                                        }
                                        else
                                        {
                                            console.log("Page_user_register_centre: after register: Get Users: No JWT to use");
                                            alert('Failed to get retrieve user entries to populate display');
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log("Page_user_register_centre: submit error:", error);
                                    })
                                    .finally(function () { 
                                        setFormInput({email: "", password: "", name: ""});
                                    });
                                }}
                            >
                                <div className="my-1">
                                    <label className="col-form-label">User Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="userEmailInput" 
                                        name="userEmailInput" 
                                        maxLength="30"
                                        required
                                        value={formInput.email}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, email: e.target.value }));
                                        }}
                                    ></input>                          
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">User Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="userPwInput" 
                                        name="userPwInput"
                                        minLength="8"
                                        maxLength="25"
                                        required
                                        value={formInput.password}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, password: e.target.value }));
                                        }}
                                    ></input>                 
                                </div>
                                <div className="my-1">
                                    <label className="col-form-label">User Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="userNameInput" 
                                        name="userNameInput" 
                                        maxLength="25"
                                        required
                                        value={formInput.name}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, name: e.target.value }));
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
                                    className="btn btn-primary"
                                    form="userRegisterForm"
                                    onClick={() => { 
                                        console.log("Page_user_register_centre: register button clicked");

                                        const isEmptyEmail = formInput.email.length === 0;
                                        const isEmptyPw = formInput.password.length === 0;
                                        const isEmptyName = formInput.name.length === 0;
                                        const anyEmptyInput = (isEmptyEmail || isEmptyPw || isEmptyName);

                                        if (anyEmptyInput) 
                                        {
                                            alert('Please fill in all the form fields before clicking register');
                                        }
                                        else if(formInput.password.length < 8)
                                        {
                                            alert('Please enter a password with at least 8 characters');
                                        }
                                    }}
                                >Register</button>
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