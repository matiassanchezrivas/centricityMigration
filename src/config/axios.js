import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.sandbox-us.centricity.io:8080/api',
    timeout: 1000,
    headers: {
        "X-Auth-Sid": "29a31d61-63d2-46cf-852d-78d2ebed4b6a"
    },
    crossDomain: true
});

export default instance;