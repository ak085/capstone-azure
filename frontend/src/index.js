//import ReactDOM from 'react-dom/client';
import App from './App.js';
import ReactDOM from 'react-dom/client';

// Check existing JWT tokens without clearing them
const retrivedJWT = localStorage.getItem('jwtToken');
const retrivedJwtTime = localStorage.getItem('jwtToken_time');
const retrivedJwtUser = localStorage.getItem('jwtToken_user');
console.log("index.js: existing local storage jwt:", retrivedJWT);
console.log("index.js: existing local storage jwt time:", retrivedJwtTime);
console.log("index.js: existing local storage jwt user:", retrivedJwtUser);

const domElement = document.getElementById('root');
const root = ReactDOM.createRoot(domElement);
root.render(<App />);
