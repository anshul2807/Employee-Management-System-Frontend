import axiosInstance from './axiosInstance';

const AUTH_URL = '/auth';

const login = async (username, password) => {
  try {
    const response = await axiosInstance.post(`${AUTH_URL}/login`, {
      username:username,
      password:password,
    });
    // console.log(response);
    const jwtToken = response.data.token; 
    if (jwtToken) {
      localStorage.setItem('jwtToken', jwtToken);
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

const changePassword = async (updatedPassword) => {
  const response = await axiosInstance.put(`${AUTH_URL}/pwd-change`, updatedPassword);
  return response.data;
};


const registerUser = async (userData) => {
  const response = await axiosInstance.post(`${AUTH_URL}/register`, userData);
  return response.data;
};


const adminChangePassword = async (username,password) => {
  const response = await axiosInstance.put(`${AUTH_URL}/admin-pwd-change`,{
    username,
    password
  });
  return response.data;
};

const listAllUsers = async () => {
    const response = await axiosInstance.get(`${AUTH_URL}/all-users`);
    return response.data;
};
const getUserById = async (userId) => {
    const response = await axiosInstance.get(`${AUTH_URL}/userid/${userId}`);
    return response.data;
}


const logout = () => {
    localStorage.removeItem('jwtToken');
    // NOTE: You would typically update your AuthContext state here too.
};


export default {
  login,
  logout,
  changePassword,
  registerUser,
  adminChangePassword,
  listAllUsers,
  getUserById
};