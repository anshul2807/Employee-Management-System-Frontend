import axiosInstance from './axiosInstance';

const EMPLOYEE_URL = '/employee';

const updateEmployeeByUser = async (data) => {
  try {
    const response = await axiosInstance.put(`${EMPLOYEE_URL}/updateByUser`, data);
    return response.data;
  } catch (error) {
    console.error('User self-update failed:',error.message);
    throw error;
  }
};


const createEmployee = async (employeeData) => {
  try {
    const response = await axiosInstance.post(EMPLOYEE_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error('Employee creation failed:', error.response?.data || error.message);
    throw error;
  }
};


const getAllEmployees = async () => {
  try {
    const response = await axiosInstance.get(EMPLOYEE_URL);
    return response.data;
  } catch (error) {
    console.error('Fetching all employees failed:', error.response?.data || error.message);
    throw error;
  }
};


const getEmployeeById = async (myid) => {
  try {
    const response = await axiosInstance.get(`${EMPLOYEE_URL}/${myid}`);
    return response.data;
  } catch (error) {
    console.error(`Fetching employee with ID ${myid} failed:`, error.response?.data || error.message);
    throw error;
  }
};


const updateEmployeeByAdmin = async (myid,data) => {
  try {
    const response = await axiosInstance.put(`${EMPLOYEE_URL}/updateByAdmin/${myid}`, data);
    return response.data;
  } catch (error) {
    console.error('Admin update failed:', error.response?.data || error.message);
    throw error;
  }
};


const terminateEmployee = async (myid) => {
  try {
    const response = await axiosInstance.delete(`${EMPLOYEE_URL}/${myid}/terminate`);
    return response.data;
  } catch (error) {
    console.error(`Termination of employee ${myid} failed:`, error.response?.data || error.message);
    throw error;
  }
};


const getDirectReports = async (managerId) => {
  try {
    const response = await axiosInstance.get(`${EMPLOYEE_URL}/${managerId}/reports`);
    return response.data;
  } catch (error) {
    console.error(`Fetching reports for manager ${managerId} failed:`, error.response?.data || error.message);
    throw error;
  }
};


export default {
  updateEmployeeByUser,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeByAdmin,
  terminateEmployee,
  getDirectReports,
};