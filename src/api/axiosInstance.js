import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; 


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error('Unauthorized or Forbidden request. Logging out user.');
      localStorage.removeItem('jwtToken');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;