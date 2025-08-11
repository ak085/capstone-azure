import { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch  } from 'react-redux';
import { updateLogin } from '../store/settingSlice.js';

import Product_single_card from './Product_single_card.js';
import Category_single_card from './Category_single_card.js';
import User_single_card from './User_single_card.js';
import Capstone_config from '../config/Capstone_config.js';

const config = Capstone_config();
const userLoginEP = config.userLoginEP;
const userAllEP = config.userAllEP;
const productEP = config.productEP;
const categoryEP = config.categoryEP;
const defaultLoginEmail = config.defaultLoginEmail;
const defaultLoginPw = config.defaultLoginPw;

export default function Page_Home(props) { 
    
    const [productDetails, setProductDetails] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [userDetails, setUserDetails] = useState([]);

    const dispatch = useDispatch();
    const storeSettingsAcc = useSelector(function (store) {
        return store.settings.accountLogin;
    });

    // console.log("Page_Home: Capstone_config:", config);
    // console.log("Page_Home: userLoginEP:", userLoginEP);
    // console.log("Page_Home: userAllEP:", userAllEP);
    // console.log("Page_Home: productEP:", productEP);
    // console.log("Page_Home: categoryEP:", categoryEP);
    // console.log("Page_Home: defaultLoginEmail:", defaultLoginEmail);
    // console.log("Page_Home: defaultLoginPw:", defaultLoginPw);
    // console.log("Page_Home: storeSettingsAcc:", storeSettingsAcc);

    useEffect(() => {
        console.log(`Page_Home: use effect: execution: `);

        axios.post(userLoginEP, {
                email: defaultLoginEmail,
                password: defaultLoginPw
        })
        .then(function (response) {

            const retrivedJWT = localStorage.getItem('jwtToken');
            if (retrivedJWT.length === 0)
            {
                const jwtToken = response.data.token;
                const jwtUpdateTime = new Date();
                localStorage.setItem('jwtToken', jwtToken);
                localStorage.setItem('jwtToken_time', jwtUpdateTime.toLocaleString());
                localStorage.setItem('jwtToken_user', defaultLoginEmail);

                console.log("Page_Home: set first jwt:", jwtToken);
                const dispatchPayload = {setLogin: true, email: defaultLoginEmail, password: defaultLoginPw, loginTime: jwtUpdateTime.toLocaleString()};
                dispatch( updateLogin(dispatchPayload) ); 
            }
            else
            {
                console.log("Page_Home: no need to set jwt");
            }
        })
        .then(function () {
            console.log(`Page_Home: use effect: after jwt: Get Products: `);
            axios.get(productEP)
            .then(function (response)  {
                console.log("Page_Home: Products HTTP GET request succcess");
                setProductDetails(response.data);
                console.log(response.data);
            });
        })
        .then(function () {
            console.log(`Page_Home: use effect: after jwt: Get Category: `);
            const retrivedJWT = localStorage.getItem('jwtToken');
            const retrivedJwtTime = localStorage.getItem('jwtToken_time');
            const retrivedJwtUser = localStorage.getItem('jwtToken_user');
            console.log("Page_Home: using jwt:", retrivedJWT);
            console.log("Page_Home: jwt time:", retrivedJwtTime);
            console.log("Page_Home: jwt user:", retrivedJwtUser);

            axios.get(categoryEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
            .then(function (response) {
                console.log("Page_Home: Category HTTP GET request succcess");
                setCategoryDetails(response.data);
                console.log(response.data);
            });
        })
        .then(function () {
            console.log(`Page_Home: use effect: after jwt: Get Users: `);
            const retrivedJWT = localStorage.getItem('jwtToken');

            axios.get(userAllEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
            .then(function (response) {
                console.log("Page_Home: User HTTP GET request succcess");
                setUserDetails(response.data);
                console.log(response.data);
            });
        })
        .catch(function (error) {
            console.log("Page_Home: use effect error:", error);
        });

    }, []);

    return (
        <div>
            <div className="alert alert-primary text-center" role="alert">
                Products Entries
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
            <div className="alert alert-success text-center" role="alert">
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

            <div className="alert alert-warning text-center" role="alert">
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
    );
}