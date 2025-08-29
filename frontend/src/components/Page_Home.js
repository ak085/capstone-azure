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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const storeSettingsAcc = useSelector(function (store) {
        return store.settings.accountLogin;
    });

    console.log("Page_Home: Component rendered");
    console.log("Page_Home: Capstone_config:", config);
    console.log("Page_Home: userLoginEP:", userLoginEP);
    console.log("Page_Home: userAllEP:", userAllEP);
    console.log("Page_Home: productEP:", productEP);
    console.log("Page_Home: categoryEP:", categoryEP);
    console.log("Page_Home: defaultLoginEmail:", defaultLoginEmail);
    console.log("Page_Home: defaultLoginPw:", defaultLoginPw);
    console.log("Page_Home: storeSettingsAcc:", storeSettingsAcc);

    useEffect(() => {
        console.log(`Page_Home: use effect: execution: `);
        
        // Check if user is already logged in - check on every render
        const jwtToken = localStorage.getItem('jwtToken');
        console.log("Page_Home: Current JWT token:", jwtToken ? "Found" : "Not found");
        
        if (!jwtToken) {
            console.log("Page_Home: No JWT found, setting error state");
            setError("No authentication token found. Please login first.");
            setLoading(false);
            return; // Don't proceed with data fetching
        }
        
        setLoading(true);
        setError(null);
        
        // Check for existing JWT token - no auto-login
        const getJWT = async () => {
            try {
                let retrivedJWT = localStorage.getItem('jwtToken');
                console.log("Page_Home: Retrieved JWT from localStorage:", retrivedJWT);
                
                // If no JWT token exists, user needs to login manually
                if (!retrivedJWT) {
                    console.log("Page_Home: No JWT found, user needs to login manually");
                    throw new Error("No authentication token found. Please login first.");
                } else {
                    console.log("Page_Home: JWT token found, proceeding with data fetch");
                }

                return retrivedJWT;
            } catch (error) {
                console.error("Page_Home: Error getting JWT:", error);
                throw error;
            }
        };

        // Fetch all data
        const fetchAllData = async () => {
            try {
                const jwt = await getJWT();
                console.log("Page_Home: Got JWT, starting data fetch...");
                
                // Fetch products (no JWT required)
                console.log("Page_Home: Fetching products from:", productEP);
                try {
                    const productsResponse = await axios.get(productEP);
                    console.log("Page_Home: Products HTTP GET request success, data:", productsResponse.data);
                    setProductDetails(productsResponse.data);
                    console.log("Page_Home: Products state updated, count:", productsResponse.data.length);
                } catch (productError) {
                    console.error("Page_Home: Products fetch failed:", productError);
                    setProductDetails([]);
                }
                
                // Fetch categories
                console.log("Page_Home: Fetching categories from:", categoryEP);
                try {
                    const categoriesResponse = await axios.get(categoryEP, { 
                        headers: { Authorization: `Bearer ${jwt}`} 
                    });
                    console.log("Page_Home: Category HTTP GET request success, data:", categoriesResponse.data);
                    setCategoryDetails(categoriesResponse.data);
                    console.log("Page_Home: Categories state updated, count:", categoriesResponse.data.length);
                } catch (categoryError) {
                    console.error("Page_Home: Categories fetch failed:", categoryError);
                    setCategoryDetails([]);
                }
                
                // Fetch users
                console.log("Page_Home: Fetching users from:", userAllEP);
                try {
                    const usersResponse = await axios.get(userAllEP, { 
                        headers: { Authorization: `Bearer ${jwt}`} 
                    });
                    console.log("Page_Home: User HTTP GET request success, data:", usersResponse.data);
                    setUserDetails(usersResponse.data);
                    console.log("Page_Home: Users state updated, count:", usersResponse.data.length);
                } catch (userError) {
                    console.error("Page_Home: Users fetch failed:", userError);
                    setUserDetails([]);
                }
                
                console.log("Page_Home: All data fetch attempts completed, setting loading to false");
                setLoading(false);
                console.log("Page_Home: Loading state set to false");
            } catch (error) {
                console.error("Page_Home: Critical error in fetchAllData:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        // Add a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            console.log("Page_Home: Data fetch timeout reached");
            setError("Data fetch timeout. Please check your connection and try again.");
            setLoading(false);
        }, 5000); // Reduced to 5 second timeout
        
        // Add a fallback timeout as backup
        const fallbackTimeout = setTimeout(() => {
            console.log("Page_Home: Fallback timeout reached - forcing loading to stop");
            setLoading(false);
            setError("Failed to load data. Please refresh the page.");
        }, 8000); // 8 second fallback
        
        // Start the data fetching process
        fetchAllData().finally(() => {
            clearTimeout(timeoutId);
            clearTimeout(fallbackTimeout);
        });
        
        // Add a listener for storage changes to detect login/logout
        const handleStorageChange = (e) => {
            if (e.key === 'jwtToken') {
                console.log('Page_Home: JWT token changed, re-checking authentication');
                // Force re-render by updating state
                setLoading(prev => !prev);
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearTimeout(timeoutId);
            clearTimeout(fallbackTimeout);
        };
    }, [dispatch]);

    console.log("Page_Home: Current state - loading:", loading, "error:", error);
    console.log("Page_Home: Products count:", productDetails.length, "Data:", productDetails);
    console.log("Page_Home: Categories count:", categoryDetails.length, "Data:", categoryDetails);
    console.log("Page_Home: Users count:", userDetails.length, "Data:", userDetails);

    if (loading) {
        console.log("Page_Home: Rendering loading state");
        return (
            <div className="text-center p-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading data...</p>
                <div className="mt-3">
                    <small className="text-muted">
                        Debug: Loading state active. Check console for progress...
                    </small>
                </div>
            </div>
        );
    }

    if (error) {
        console.log("Page_Home: Rendering error state:", error);
        
        // Check if it's an authentication error
        if (error.includes("No authentication token") || error.includes("Please login first")) {
            // Redirect immediately to login page instead of showing prompt
            window.location.href = 'login.html';
            return null; // Don't render anything while redirecting
        }
        
        // For other errors, show the retry button
        return (
            <div className="alert alert-danger text-center" role="alert">
                <h4>Error loading data</h4>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    console.log("Page_Home: Rendering data section");
    console.log("Page_Home: About to render products section with", productDetails.length, "items");

    return (
        <div>
            <div className="alert alert-primary text-center" role="alert">
                Products Entries ({productDetails.length} items)
            </div>
            <div className="container">
                {productDetails.length > 0 ? (
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
                ) : (
                    <div className="text-center p-3">
                        <p className="text-muted">No products found</p>
                    </div>
                )}
            </div>
            
            <div className="alert alert-success text-center" role="alert">
                Category Entries ({categoryDetails.length} items)
            </div>
            <div className="container">
                {categoryDetails.length > 0 ? (
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
                ) : (
                    <div className="text-center p-3">
                        <p className="text-muted">No categories found</p>
                    </div>
                )}
            </div>

            <div className="alert alert-warning text-center" role="alert">
                User Entries ({userDetails.length} items)
            </div>
            <div className="container">
                {userDetails.length > 0 ? (
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
                ) : (
                    <div className="text-center p-3">
                        <p className="text-muted">No users found</p>
                    </div>
                )}
            </div>                   
        </div>
    );
}