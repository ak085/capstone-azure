import { useSelector } from 'react-redux';

export default function Login_pw(props) {
    // this component handles the login input for password

    const accLogin = useSelector(function (store) {
        return store.settings.accountLogin;
    });

    //console.log(`Login_pw: isLogin: ${isLogin}`);

    return accLogin.isLogin ? (
        <>
            <input
                type="password"
                className="form-control"
                id="accPw"
                placeholder="Password"
                value={accLogin.password}
                disabled
            ></input>
        </>
    ) : (
        <>
            <input
                type="password"
                className="form-control"
                id="accPw"
                placeholder="Password"
                value={props.pwInput}
                onChange={(e) => {
                    props.onPwChange(e.target.value);
                }}
            ></input>
        </>
    );
}
