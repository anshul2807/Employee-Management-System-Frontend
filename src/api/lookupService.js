import axiosInstance from './axiosInstance';

const LOOKUPS_URL = '/lookups';


const getDepartments = async () => {
  try {
    const response = await axiosInstance.get(`${LOOKUPS_URL}/departments`);
    return response.data;
  } catch (error) {
    console.error('Fetching departments failed:', error.response?.data || error.message);
    throw error;
  }
};


const getJobTitles = async () => {
  try {
    const response = await axiosInstance.get(`${LOOKUPS_URL}/job-titles`);
    return response.data;
  } catch (error) {
    console.error('Fetching job titles failed:', error.response?.data || error.message);
    throw error;
  }
};

// ADMIN operations only 

const createDepartment = async (departmentData) => {
  try {
    const response = await axiosInstance.post(`${LOOKUPS_URL}/departments`, departmentData);
    return response.data;
  } catch (error) {
    console.error('Creating department failed:', error.response?.data || error.message);
    throw error;
  }
};


const createJobTitle = async (jobTitleData) => {
  try {
    const response = await axiosInstance.post(`${LOOKUPS_URL}/job-titles`, jobTitleData);
    return response.data;
  } catch (error) {
    console.error('Creating job title failed:', error.response?.data || error.message);
    throw error;
  }
};


export default {
  getDepartments,
  getJobTitles,
  createDepartment,
  createJobTitle,
};