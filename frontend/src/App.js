import { createHashRouter, Link, RouterProvider } from 'react-router-dom';

import RootPage from './components/RootPage.js';
import Page_add_centre from './components/Page_add_centre.js'
import Page_Home from './components/Page_Home.js'
import Page_user_register_centre from './components/Page_user_register_centre.js';
import Page_delete_centre from './components/Page_delete_centre.js';
import Page_update_centre from './components/Page_update_centre.js';
import Page_add_cat_centre from './components/Page_add_cat_centre.js';
import Page_update_cat_centre from './components/Page_update_cat_centre.js';
import Page_filter_product_centre from './components/Page_filter_product_centre.js';
import Page_filter_category_centre from './components/Page_filter_category_centre.js';
import Page_filter_user_centre from './components/Page_filter_user_centre.js';

const router = createHashRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            {
                path: '/',
                element: <Page_Home></Page_Home>,
            },
            {
                path: '/add',
                element: <Page_add_centre></Page_add_centre>, 
            },
            {
                path: '/update',
                element: <Page_update_centre></Page_update_centre>, 
            },             
            {
                path: '/delete',
                element: <Page_delete_centre></Page_delete_centre>,
            },
            {
                path: '/filterproduct',
                element: <Page_filter_product_centre></Page_filter_product_centre>,
            },
            {
                path: '/registeruser',
                element: <Page_user_register_centre></Page_user_register_centre>, 
            },
            {
                path: '/filteruser',
                element: <Page_filter_user_centre></Page_filter_user_centre>,
            },             
            {
                path: '/addcategory',
                element: <Page_add_cat_centre></Page_add_cat_centre>, 
            },
            {
                path: '/updatecategory',
                element: <Page_update_cat_centre></Page_update_cat_centre>, 
            },
            {
                path: '/filtercategory',
                element: <Page_filter_category_centre></Page_filter_category_centre>,
            },                   
        ],
    },
]);

export default function App(props) {

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}