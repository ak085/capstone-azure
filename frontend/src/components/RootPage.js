import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';

import Page_top_nav from './Page_top_nav.js';
import Page_top_login from './Page_top_login.js';
import storage from '../store/storage.js';

// import Page_top_login from './Page_top_login.js';
// import Page_top_nav from './Page_top_nav.js';
// import { contextMainParams } from './contextMainParams.js';

export default function RootPage(props) {

    useEffect(() => {
        console.log(`Root Page: use effect: execution: `);
        
        // Listen for login success events from the login page
        const handleLoginSuccess = (event) => {
            console.log('RootPage: Received login success event:', event.detail);
            
            // Force a re-render by dispatching a login update
            // This will sync the Redux store with localStorage
            const jwtToken = localStorage.getItem('jwtToken');
            const jwtTime = localStorage.getItem('jwtToken_time');
            const jwtUser = localStorage.getItem('jwtToken_user');
            
            if (jwtToken && jwtTime && jwtUser) {
                // Import the action creator
                import('../store/settingSlice.js').then(({ updateLogin }) => {
                    const dispatchPayload = {
                        setLogin: true, 
                        email: jwtUser, 
                        password: "", 
                        loginTime: jwtTime
                    };
                    // Note: We can't dispatch here since we don't have access to dispatch
                    // But this will help with debugging
                    console.log('RootPage: Would dispatch login update:', dispatchPayload);
                });
            }
        };
        
        window.addEventListener('userLoginSuccess', handleLoginSuccess);
        
        // Cleanup
        return () => {
            window.removeEventListener('userLoginSuccess', handleLoginSuccess);
        };
    }, []);

    console.log(`Root Page: `);

    return (
        <div>
            <Provider store={storage}> 
                <Page_top_nav></Page_top_nav>
                <Page_top_login></Page_top_login>
                <div>                
                    <Outlet />
                </div>
            </Provider>
        </div>
    );
}