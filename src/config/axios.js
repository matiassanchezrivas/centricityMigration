import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.sandbox-us.centricity.io:8080/api',
    timeout: 1000,
    headers: {
        "X-Auth-Sid": "e17a9cd5-2bf5-43da-8730-1879e3377124"
    },
    crossDomain: true
});

export default instance;