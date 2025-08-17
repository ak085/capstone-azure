import axios from 'axios';
import { useEffect, useState } from 'react';

import Product_single_card from './Product_single_card.js';
import Capstone_config from '../config/Capstone_config.js';
const config = Capstone_config();
const productEP = config.productEP;

export default function Page_delete_centre(props) {

    return (
        <div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-8 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Delete selected products</h6>
                            <form 
                                className="adminForm"
                                id="templateForm"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Template form: Form submitted successfully");


                                }}
                            ></form>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-4 mt-3 px-2">
                        <div className="h-100 container mt-2 px-3 py-2 bg-body-secondary border border-2 rounded-4">
                            <h6 className="text-center text-primary-emphasis">Action</h6>
                            <div className="row my-3 d-grid px-2">
                               <button 
                                    type="submit" 
                                    form="templateForm"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log("Template form: add button clicked");


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

                    </div>
                </div>                                 
            </div>
        </div>
    );
}