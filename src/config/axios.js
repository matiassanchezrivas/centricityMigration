import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.sandbox-us.centricity.io:8080/api',
    timeout: 1000,
    headers: {
        "X-Auth-Sid": "acdd6e54-df83-44ac-b402-c9726b55fa8c"
    },
    crossDomain: true
});

export default instance;