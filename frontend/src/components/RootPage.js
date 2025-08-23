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