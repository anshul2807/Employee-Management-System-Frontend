import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import lookupService from '../../api/lookupService';
import Table from '../../components/tables/Table';

const Lookups = () => {
    const [loading, setLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState([]);
    const [jobTitleData, setJobTitleData] = useState([]);
    const [errorDepartment, setErrorDepartment] = useState(null);
    const [errorJobTitle, setErrorJobTitle] = useState(null);
    const [departmentInput, setDepartmentInput] = useState({
        name: '',
        location: '',
        description: ''
    });
    const [jobTitleInput, setJobTitleInput] = useState({
        name: '',
        level: '',
        jobDescription: ''
    });
    const [departmentCreateMessage, setDepartmentCreateMessage] = useState(null);
    const [jobTitleCreateMessage, setJobTitleCreateMessage] = useState(null);

    // Helper function to re-fetch data after creation
    const refetchData = async () => {
        setLoading(true);
        const fetchDepartmentData = async () => {
            setErrorDepartment(null);
            try {
                const departmentResponse = await lookupService.getDepartments();
                setDepartmentData(departmentResponse);
            } catch (err) {
                setErrorDepartment('Failed to fetch Departments data.');
            }
        }
        const fetchJobTitleData = async () => {
            setErrorJobTitle(null);
            try {
                const jobTitleResponse = await lookupService.getJobTitles();
                setJobTitleData(jobTitleResponse);
            } catch (err) {
                setErrorJobTitle('Failed to fetch Job Titles data.');
            }
        }
        try {
            await Promise.all([fetchDepartmentData(), fetchJobTitleData()]);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        refetchData();
    }, []);

    if (loading) {
        return <LoadingSpinner message="Loading Lookups section!!" />;
    }
    
    const ErrorMessage = (message) => {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{message}</span>
            </div>
        );
    }
    
    // Success/Info Message component
    const AlertMessage = ({ message, type }) => {
        const baseClasses = "px-4 py-3 rounded relative my-4";
        const successClasses = "bg-green-100 border border-green-400 text-green-700";
        const errorClasses = "bg-red-100 border border-red-400 text-red-700";
        const classes = type === 'success' ? successClasses : errorClasses;

        return (
            <div className={`${baseClasses} ${classes}`} role="alert">
                <span className="block sm:inline">{message}</span>
            </div>
        );
    }

    const handleDepartmentInputChange = (e) => {
        const { name, value } = e.target;
        setDepartmentInput(prev => ({ ...prev, [name]: value }));
    }

    const handleJobTitleInputChange = (e) => {
        const { name, value } = e.target;
        setJobTitleInput(prev => ({ ...prev, [name]: value }));
    }

    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        try {
            setDepartmentCreateMessage(null); 
            if (!departmentInput.name || !departmentInput.location || !departmentInput.description) {
                setDepartmentCreateMessage({ message: 'All fields are required to create a Department.', type: 'error' });
                return;
            }
            const response = await lookupService.createDepartment(departmentInput);
            setDepartmentCreateMessage({ message: response.message || 'Department created successfully!', type: 'success' });
            refetchData(); 
        } catch (error) {
            setDepartmentCreateMessage({ message: error.message || 'Failed to create Department.', type: 'error' });
        } finally {
            setDepartmentInput({ name: '', location: '', description: '' });
            setTimeout(() => {
                setDepartmentCreateMessage(null);
            }, 8000);
        }
    }

    const handleCreateJobTitle = async (e) => {
        e.preventDefault();
        try {
            setJobTitleCreateMessage(null); // Clear previous messages
            if (!jobTitleInput.name || !jobTitleInput.level || !jobTitleInput.jobDescription) {
                setJobTitleCreateMessage({ message: 'All fields are required to create a Job Title.', type: 'error' });
                return;
            }
            const response = await lookupService.createJobTitle(jobTitleInput);
            setJobTitleCreateMessage({ message: response.message || 'Job Title created successfully!', type: 'success' });
            refetchData(); // Refresh the job title list
        } catch (error) {
            setJobTitleCreateMessage({ message: error.message || 'Failed to create Job Title.', type: 'error' });
        } finally {
            setJobTitleInput({ name: '', level: '', jobDescription: '' });
            setTimeout(() => {
                setJobTitleCreateMessage(null);
            }, 8000);
        }
    }

    return (
        <div className="outer p-6"> {/* Added p-6 for general padding */}
            <header className="mb-8 border-b pb-4"> {/* Increased mb and added border */}
                <h1 className="text-4xl font-extrabold text-gray-900">🗂️ Lookups Administration</h1>
                <p className="text-lg text-gray-600 mt-1">View and create departments and job titles.</p>
            </header>

            {/* Departments Table Section */}
            <div className="section1 max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mb-8">
                {errorDepartment ? ErrorMessage(errorDepartment) :
                    <Table
                        title="Departments List"
                        data={departmentData}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Name', accessor: 'name' },
                            { header: 'Location', accessor: 'location' },
                            { header: 'Description', accessor: 'description' }
                        ]}
                    />
                }
            </div>
            
            {/* Job Titles Table Section */}
            <div className="section2 max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mb-8">
                {errorJobTitle ? ErrorMessage(errorJobTitle) :
                    <Table
                        title="Job Titles List"
                        data={jobTitleData}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Name', accessor: 'name' },
                            { header: 'Level', accessor: 'level' },
                            { header: 'Job Description', accessor: 'jobDescription' },
                        ]}
                    />
                }
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"> {/* Use grid for side-by-side forms */}
                
                {/* Section 3: Creating Departments */}
                <div className="section3 p-6 bg-white shadow-xl rounded-lg border border-indigo-100">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-6 border-b pb-3">➕ Create New Department</h2>
                    
                    {departmentCreateMessage && (
                        <AlertMessage message={departmentCreateMessage.message} type={departmentCreateMessage.type} />
                    )}

                    <form onSubmit={handleCreateDepartment} className="space-y-4">
                        
                        {/* Name Input */}
                        <div>
                            <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">Department Name</label>
                            <input
                                type="text"
                                id="departmentName"
                                name="name"
                                value={departmentInput.name}
                                onChange={handleDepartmentInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="e.g., Human Resources"
                                required
                            />
                        </div>

                        {/* Location Input */}
                        <div>
                            <label htmlFor="departmentLocation" className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                id="departmentLocation"
                                name="location"
                                value={departmentInput.location}
                                onChange={handleDepartmentInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="e.g., 4th Floor, Main Office"
                                required
                            />
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label htmlFor="departmentDescription" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="departmentDescription"
                                name="description"
                                rows="3"
                                value={departmentInput.description}
                                onChange={handleDepartmentInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Briefly describe the department's primary function."
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            Create Department
                        </button>
                    </form>
                </div>

                {/* Section 4: Creating Job Titles */}
                <div className="section4 p-6 bg-white shadow-xl rounded-lg border border-purple-100">
                    <h2 className="text-2xl font-semibold text-purple-700 mb-6 border-b pb-3">➕ Create New Job Title</h2>
                    
                    {jobTitleCreateMessage && (
                        <AlertMessage message={jobTitleCreateMessage.message} type={jobTitleCreateMessage.type} />
                    )}

                    <form onSubmit={handleCreateJobTitle} className="space-y-4">
                        
                        {/* Name Input */}
                        <div>
                            <label htmlFor="jobTitleName" className="block text-sm font-medium text-gray-700">Job Title Name</label>
                            <input
                                type="text"
                                id="jobTitleName"
                                name="name"
                                value={jobTitleInput.name}
                                onChange={handleJobTitleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:border-purple-500 focus:ring-purple-500"
                                placeholder="e.g., Senior Software Engineer"
                                required
                            />
                        </div>

                        {/* Level Input */}
                        <div>
                            <label htmlFor="jobTitleLevel" className="block text-sm font-medium text-gray-700">Level/Grade</label>
                            <input
                                type="text"
                                id="jobTitleLevel"
                                name="level"
                                value={jobTitleInput.level}
                                onChange={handleJobTitleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:border-purple-500 focus:ring-purple-500"
                                placeholder="e.g., L3, Grade 5"
                                required
                            />
                        </div>

                        {/* Job Description Textarea */}
                        <div>
                            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
                            <textarea
                                id="jobDescription"
                                name="jobDescription"
                                rows="3"
                                value={jobTitleInput.jobDescription}
                                onChange={handleJobTitleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:border-purple-500 focus:ring-purple-500"
                                placeholder="Outline the main duties and responsibilities."
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                        >
                            Create Job Title
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Lookups;