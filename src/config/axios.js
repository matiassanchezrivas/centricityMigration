import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.sandbox-us.centricity.io:8080/api',
    timeout: 1000,
    headers: {
        "X-Auth-Sid": "f18fd2ea-2552-4297-93de-cc40c9a1db22"
    },
    crossDomain: true
});

export default instance;