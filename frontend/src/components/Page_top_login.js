import { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
// import { generateCart, clearCart, modifyCartQty } from './cartSlice.js';
// import { updateOrderList } from './orderSlice.js';

import Login_email from './Login_email.js';
import Login_pw from './Login_pw.js';
import Login_btn from './Login_btn.js';

export default function Page_top_login(props) {

    const [emailInput, setEmailInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    
    const clsIconDefault = 'bi bi-person-exclamation navbarLoginIcon';
    // const clsIconAdmin = 'bi bi-person-gear navbarLoginIcon';
    // const clsIcon = props.mainParams.userMode === 'administrator' ? clsIconAdmin : clsIconDefault;

    console.log('Page_top_login: emailInput:', emailInput);
    console.log('Page_top_login: pwInput:', pwInput);

    // const dispatch = useDispatch();
    const accLogin = useSelector(function (store) {
        return store.settings.accountLogin;
    });

    return (
        <div className="row py-2 justify-content-center ">
            <div className="col-sm-12 col-lg-1 my-1 d-grid">
                <button type="button" className="btn btn-light btn-sm navbarLoginIconBtn">
                    <i className={clsIconDefault}></i>
                </button>
            </div>
            <div className="col-sm-12 col-lg-1 text-center my-1">
                <h6 className="mt-2">Email</h6>
            </div>
            <div className="col-sm-12 col-lg-3 my-1">
                <Login_email
                    emailInput={emailInput}
                    onEmailChange={(newValue) => setEmailInput(newValue)}
                ></Login_email>
            </div>
            <div className="col-sm-12 col-lg-1 text-center my-1">
                <h6 className="mt-2">Password</h6>
            </div>
            <div className="col-sm-12 col-lg-3 my-1">
                <Login_pw
                    pwInput={pwInput}
                    onPwChange={(newValue) => setPwInput(newValue)}
                ></Login_pw>
            </div>
            <div className="col-sm-12 col-lg-1 d-grid my-1">
                <Login_btn
                    emailInput={emailInput}
                    pwInput={pwInput}
                    onEmailChange={(newValue) => setEmailInput(newValue)}
                    onPwChange={(newValue) => setPwInput(newValue)}
                ></Login_btn>
            </div>
            <div className="col-sm-12 col-lg-2 px-0 my-1 d-grid">
                <h6 className="mt-2 jwtTime">JWT:{accLogin.loginTime}</h6>
            </div>
        </div>
    );
}
