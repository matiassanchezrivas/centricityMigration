import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.sandbox-us.centricity.io:8080/api',
    timeout: 1000,
    headers: {
        "X-Auth-Sid": "f5334970-e6a2-4f1e-bed5-463cc89ccd29"
    },
    crossDomain: true
});

export default instance;