import axios from 'axios';
import { useEffect, useState } from 'react';

import Product_single_card_delete from './Product_single_card_delete.js';
import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const productEP = config.productEP;

export default function Page_delete_centre(props) {

    const [productDetails, setProductDetails] = useState([]);
    const [itemIdSelect, setItemIdSelect] = useState([]);

    useEffect(() => {
        console.log("Page_delete_centre: use effect: execution: ");
        
        axios.get(productEP)
        .then(function (response) {
            console.log("Page_delete_centre: Products HTTP GET request succcess");
            const resData = response.data;
            const prefillArr = Array(resData.length).fill("");
            setItemIdSelect(prefillArr);

            setProductDetails(resData);
            console.log(resData);
        })
        .catch(function (error) {
            console.log("Page_Home: use effect error:", error);
        });	
        
    }, []);

    //console.log("Page_delete_centre: itemIdSelect:", itemIdSelect);

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Delete selected products</h6>
                            <h1 className="text-center text-danger-emphasis"> { ( itemIdSelect.filter( item => item.length !== 0 ) ).length.toString() } items selected</h1>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Action</h6>
                            <div className="row my-3 d-grid px-2">
                               <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Page_delete_centre: delete button clicked");
                                        const itemIdDeleteList = itemIdSelect.filter( item => item.length !== 0 );

                                        if (itemIdDeleteList.length === 0)
                                        {
                                            alert("Please select at least one item to delete by enabling product entry checkbox before clicking delete button.")
                                        }
                                        else
                                        {
                                            console.log("Page_delete_centre: delete requests start");
                                            console.log("Page_delete_centre: Checking itemIdSelect:", itemIdSelect);
                                            const retrivedJWT = localStorage.getItem('jwtToken');

                                            if (retrivedJWT.length !== 0)
                                            {                                               
                                                const finalIndex = itemIdDeleteList.length - 1;
                                                let hasErrorOccured = false;

                                                for(let i = 0; i < itemIdDeleteList.length; i++)
                                                {
                                                    const productId = itemIdDeleteList[i];
                                                    const deleteProductEP = `${productEP}/${productId}`;
                                                    const logMsg = `Page_delete_centre: deleting product Id: ${productId} on EP: ${deleteProductEP}`;
                                                    console.log(logMsg);

                                                    axios.delete(deleteProductEP, { headers: { Authorization: `Bearer ${retrivedJWT}`} })
                                                    .then(function (response) { 
                                                        console.log("Page_delete_centre: Delete product HTTP Post request succcess for product ID: ", productId);
                                                        console.log(response.data);
                                                    })
                                                    .catch(function (error) {
                                                        hasErrorOccured = true;    
                                                        
                                                        let errorUserMsg = "Attempted action is unsuccessful. Following error has occured: \n";
                                                        const errorItemMsg = `Delete product id: ${productId}, Error: ${error.message} \n`;
                                                        errorUserMsg += errorItemMsg;
                                                        alert(errorUserMsg);
                                                        
                                                        const logMsg = `Page_delete_centre: deleting product Id: ${productId} has error:`;
                                                        console.log(logMsg, error);
                                                    })
                                                    .finally(function () {
                                                        if((i === finalIndex) && !hasErrorOccured)
                                                        {
                                                            console.log("Page_delete_centre: All delete requests completed without errors");
                                                        }

                                                        if((i === finalIndex) || hasErrorOccured)
                                                        {
                                                            // Products HTTP GET request after all delete has been completed or error occured
                                                            axios.get(productEP)
                                                            .then(function (response) {
                                                                console.log("Page_delete_centre: products HTTP GET request succcess");
                                                                const resData = response.data;
                                                                const prefillArr = Array(resData.length).fill("");
                                                                setItemIdSelect(prefillArr);

                                                                setProductDetails(resData);
                                                                console.log(resData);
                                                            })
                                                            .catch(function (error) {
                                                                console.log("Page_Home: products HTTP GET request error:", error);
                                                                const prefillArr = Array(itemIdSelect.length).fill("");
                                                                setItemIdSelect(prefillArr);
                                                            });      
                                                        }
                                                    });
                                                }                        
                                            }
                                            else
                                            {
                                                console.log("Page_delete_centre: submit error: no jwt for HTTP request");
                                                const userErrorMsg = "Login credentials are missing to perform attempted action.";
                                                alert(userErrorMsg);
                                            }
                                        }
                                    }}
                                >Delete</button>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-2">
                <div className="alert alert-warning text-center mt-4 fw-bold" role="alert">
                    Product Entries
                </div>
                <div className="container">
                    <div className="row mt-2 mb-4">
                        {productDetails.map(function (listItem, index) {
                            return (
                                <Product_single_card_delete 
                                    key={listItem.productid}
                                    item={listItem}
                                    listIndex={index}
                                    onUpdate={
                                        (indexToChange, newItem) => {
                                            const newItemIdSelect = itemIdSelect.map((orgItem, index) => {
                                                if (index === indexToChange) 
                                                {
                                                    return newItem;
                                                }
                                                else
                                                {
                                                    return orgItem;
                                                }
                                            });
                                            setItemIdSelect(newItemIdSelect);
                                        }                                   
                                    }
                                ></Product_single_card_delete>
                            );
                        })}
                    </div>
                </div>                                 
            </div>
        </div>
    );
}