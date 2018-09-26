import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.sandbox-us.centricity.io:8080/api',
    timeout: 1000,
    headers: {
        "X-Auth-Sid": "f48b82ca-d202-4263-9d72-6400b7abde72"
    },
    crossDomain: true
});

export default instance;