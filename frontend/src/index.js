//import ReactDOM from 'react-dom/client';
import App from './App.js';
import ReactDOM from 'react-dom/client';

localStorage.setItem('jwtToken', "");
localStorage.setItem('jwtToken_time', "");
localStorage.setItem('jwtToken_user', "");
const retrivedJWT = localStorage.getItem('jwtToken');
const retrivedJwtTime = localStorage.getItem('jwtToken_time');
const retrivedJwtUser = localStorage.getItem('jwtToken_user');
console.log("index.js: initialize local storage jwt:", retrivedJWT);
console.log("index.js: initialize local storage jwt time:", retrivedJwtTime);
console.log("index.js: initialize local storage jwt user:", retrivedJwtUser);

const domElement = document.getElementById('root');
const root = ReactDOM.createRoot(domElement);
root.render(<App />);
