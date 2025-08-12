import { useSelector } from 'react-redux';

export default function Login_email(props) {
    // this component handles the login input for email
    const accLogin = useSelector(function (store) {
        return store.settings.accountLogin;
    });
    //console.log(props.loginEntry);

    return accLogin.isLogin ? (
        <>
            <input
                type="email"
                className="form-control"
                id="accEmail"
                placeholder="account@exampledomain.com"
                value={accLogin.email}
                disabled
            ></input>
        </>
    ) : (
        <>
            <input
                type="email"
                className="form-control"
                id="accEmail"
                placeholder="account@exampledomain.com"
                value={props.emailInput}
                onChange={(e) => {
                    props.onEmailChange(e.target.value);
                }}
            ></input>
        </>
    );
}
