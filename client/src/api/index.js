import axios from 'axios';
export default
    axios.create({
        baseURL: 'http://localhost:5000/',
        //baseURL: 'http://172.20.65.114:5000/',
        //baseURL: 'https://new-stack-node-api.azurewebsites.net/',
        timeout: 2000,
        headers: { 'Authorization': 'JWT ' + localStorage.getItem('front_access_token') }
    });