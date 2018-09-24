import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dev.sandbox-us.centricity.io:8080/api',
    timeout: 1000,
    headers: {
        "X-Auth-Sid": "bc36eb1a-ddd9-4b08-a6b7-c6da9c76d11b"
    }
});

export default instance;