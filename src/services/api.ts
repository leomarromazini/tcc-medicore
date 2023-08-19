import axios from 'axios';

const apiURL = 'https://medcareapp.azurewebsites.net';

const api = axios.create({
  baseURL: apiURL,
});

export default api;
