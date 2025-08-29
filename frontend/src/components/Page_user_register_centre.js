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
        name: '',
        role: 'Member' // Default to Member, not Admin
    });

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formInput.email || !formInput.password || !formInput.name) {
            alert('Please fill in all the form fields before clicking register');
            return;
        }
        
        try {
            console.log("Page_user_register_centre: Form submitted successfully");
            
            // HTTP post with JSON body no JWT required
            const response = await axios.post(userRegisterEP, {
                name: formInput.name,
                email: formInput.email,
                password: formInput.password,
                role: formInput.role
            });

            console.log("Page_user_register_centre: User register HTTP Post success, JWT:", response.data.token);
            
            // Check if user is not already logged in
            const existingJWT = localStorage.getItem('jwtToken');
            if (!existingJWT || existingJWT.length === 0) {
                const jwtToken = response.data.token;
                const jwtUpdateTime = new Date();
                localStorage.setItem('jwtToken', jwtToken);
                localStorage.setItem('jwtToken_time', jwtUpdateTime.toLocaleString());
                localStorage.setItem('jwtToken_user', formInput.email);
                
                // dispatch to slice reducer
                const dispatchPayload = {
                    setLogin: true, 
                    email: formInput.email, 
                    password: formInput.password, 
                    loginTime: jwtUpdateTime.toLocaleString()
                };
                dispatch(updateLogin(dispatchPayload));
            }

            // Success message
            alert(`User "${formInput.name}" registered successfully as ${formInput.role}!`);
            
            // Reset form
            setFormInput({
                email: '',
                password: '',
                name: '',
                role: 'Member'
            });

        } catch (error) {
            console.error("Page_user_register_centre: submit error:", error);
            alert(error.response?.data?.message || 'Failed to register user. Please try again.');
        }
    };

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Register New User</h6>
                            <form 
                                id="userRegisterForm"
                                className="adminForm"
                                onSubmit={handleSubmit}
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
                                <div className="my-1">
                                    <label className="col-form-label">User Role</label>
                                    <select 
                                        className="form-select"
                                        value={formInput.role}
                                        onChange={(e) => {
                                            setFormInput((prev) => ({ ...prev, role: e.target.value }));
                                        }}
                                        required
                                    >
                                        <option value="Member">Member</option>
                                        <option value="Admin">Admin</option>
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
                                    form="userRegisterForm"
                                    className="btn btn-primary"
                                >
                                    Register User
                                </button>
                            </div>
                        </div>  		
                    </div>
                </div>          
            </div>
        </div>
    );
}