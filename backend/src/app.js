// Full stack capstone project
// Members: Daniel Khong Mun Loong, SAI WENG CHEW, KOLMAKOV ANATOLI
// Student ID: 9197316U

//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require('express');
const path = require('path');

var cors= require('cors');
//////////////////////////////////////////////////////
// CREATE APP
//////////////////////////////////////////////////////
const app = express();

// CORS - Allow requests from frontend on port 8000 and Azure Static Web Apps
const corsOptions = {
    origin: [
        'http://localhost:8000', 
        'http://127.0.0.1:8000',
        'https://*.azurestaticapps.net',
        'https://*.azurewebsites.net'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
//////////////////////////////////////////////////////
// USES
//////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, '../public/images')));

//////////////////////////////////////////////////////
// SETUP ROUTES
//////////////////////////////////////////////////////
const mainRoutes = require('./routes/mainRoutes');
app.use("/", mainRoutes);
console.log('App started');
//////////////////////////////////////////////////////
// EXPORT APP
//////////////////////////////////////////////////////
module.exports = app;