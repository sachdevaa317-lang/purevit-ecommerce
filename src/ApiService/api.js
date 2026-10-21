import BaseUrl from './Baseurl';

import axios from 'axios';
const api = axios.create({
    baseURL: BaseUrl
});

export default api;