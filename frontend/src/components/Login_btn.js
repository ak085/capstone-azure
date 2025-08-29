import axios from 'axios';
import { useSelector, useDispatch  } from 'react-redux';
import { updateLogin, clearLogin } from '../store/settingSlice.js';

import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const userLoginEP = config.userLoginEP;

export default function Login_btn(props) {
    // this component handles the login logic for user's email and password input
    // it also uses an imported function to handle the login identity check

    const dispatch = useDispatch();

    const accLogin = useSelector(function (store) {
        return store.settings.accountLogin;
    });

    //console.log(`Login_btn:`);
    
    return (
        <>
            <button
                type="submit"
                className="btn btn-primary navbarLoginBtn"
                onClick={() => {
                    console.log("Login_btn: clicked");

                    if(accLogin.isLogin)
                    {
                        dispatch( clearLogin() );
                        props.onEmailChange("");
                        props.onPwChange("");
                    }
                    else
                    {
                        const emailTry = props.emailInput;
                        const pwTry = props.pwInput;
                        console.log("Login_btn: attempt user login: email:", emailTry);
                        console.log("Login_btn: attempt user login: password:", pwTry);

                        axios.post(userLoginEP, {
                                email: emailTry,
                                password: pwTry
                        })
                        .then(function (response) {
                            // User login HTTP request success
                            const jwtUpdateTime = new Date();
                            const jwtToken = response.data.token;
                            localStorage.setItem('jwtToken', jwtToken);
                            localStorage.setItem('jwtToken_time', jwtUpdateTime.toLocaleString());
                            localStorage.setItem('jwtToken_user', emailTry);

                            const retrivedJWT = localStorage.getItem('jwtToken');
                            const retrivedJwtTime = localStorage.getItem('jwtToken_time');
                            console.log(`Login_btn: update time: ${retrivedJwtTime}, jwt:`, retrivedJWT);
                            
                            const dispatchPayload = {setLogin: true, email: emailTry, password: pwTry, loginTime: jwtUpdateTime.toLocaleString()};
                            dispatch( updateLogin(dispatchPayload) );
                        })
                        .catch(function (error) {
                            // User login HTTP request failed
                            const userErrorMsg = `Attempted user login is unsuccessful, error: ${error.message}`;
                            alert(userErrorMsg);
                            console.log("Login_btn: User login HTTP request error:", error);
                            console.log("Login_btn: User login failed, unable to update JWT");
                            const retrivedJWT = localStorage.getItem('jwtToken');
                            const retrivedJwtTime = localStorage.getItem('jwtToken_time');

                            console.log("Login_btn: check existing jwt:", retrivedJWT);
                            console.log("Login_btn: jwt time:", retrivedJwtTime);
                            // reset email and pw input after wrong login
                            props.onEmailChange("");
                            props.onPwChange("");
                        });
                    }
                   
                }}
            >
                {accLogin.isLogin ? "Log off" : "Login" }
            </button>
        </>
    );
}
