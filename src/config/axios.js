import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.sandbox-us.centricity.io:8080/api',
    timeout: 1000,
    headers: {
        "X-Auth-Sid": "f345203c-eb6f-4659-9e25-102288d086d5"
    },
    crossDomain: true
});

export default instance;