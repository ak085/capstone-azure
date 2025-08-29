import { useSelector, useDispatch  } from 'react-redux';
import { clearLogin } from '../store/settingSlice.js';

export default function Page_top_login(props) {

    const clsIconDefault = 'bi bi-person-check navbarLoginIcon';
    
    const dispatch = useDispatch();
    const accLogin = useSelector(function (store) {
        return store.settings.accountLogin;
    });

    // Check if user is logged in
    if (!accLogin.isLogin) {
        // Redirect immediately to login page instead of showing prompt
        window.location.href = 'login.html';
        return null; // Don't render anything while redirecting
    }

    // Handle logout
    const handleLogout = () => {
        console.log('Page_top_login: Logging out user:', accLogin.email);
        
        // Clear Redux state
        dispatch(clearLogin());
        
        // Clear localStorage
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('jwtToken_time');
        localStorage.removeItem('jwtToken_user');
        
        // Redirect to login page
        window.location.href = 'login.html';
    };

    return (
        <div className="row py-2 justify-content-center align-items-center">
            <div className="col-sm-12 col-lg-1 my-1 d-grid">
                <button type="button" className="btn btn-light btn-sm navbarLoginIconBtn">
                    <i className={clsIconDefault}></i>
                </button>
            </div>
            <div className="col-sm-12 col-lg-2 text-center my-1">
                <h6 className="mt-2 mb-0">Welcome, {accLogin.email}</h6>
            </div>
            <div className="col-sm-12 col-lg-2 d-grid my-1">
                <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-left"></i> Log off
                </button>
            </div>
            <div className="col-sm-12 col-lg-3 px-0 my-1 d-grid">
                <h6 className="mt-2 mb-0 jwtTime">JWT: {accLogin.loginTime}</h6>
            </div>
        </div>
    );
}
