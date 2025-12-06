import { useState } from 'react';
import { FaUserPlus, FaLock,FaUserCircle} from 'react-icons/fa';
import authService from "../../api/authService"; 

const CreateAdminUsers = () => {
    
    // --- State Initialization ---
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

    // --- Input Change Handler ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setMessage(null); // Clear messages on input change
    };
    const handleClearInputs = () => {
        setFormData({
            username: '',
            password: '',
            confirmPassword: '',
        });
        setTimeout(() => {
                setMessage(null);
            }, 10000);
    }

    // --- Registration Logic Placeholder ---
    const handleRegister = async (e) => {
        e.preventDefault();
        if(formData.password < 6 || formData.confirmPassword <6){
            setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
            handleClearInputs();
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            handleClearInputs();
            return;
        }

        
        setMessage(null);
        setLoading(true);
        try {
            const res = await authService.registerUser({
                username: formData.username,
                password: formData.password
            });

            setMessage({ type: 'success', text: res });
        } catch (error) {
            setMessage({ type: 'error', text: error.response.data });
        }finally{
            setLoading(false);
            handleClearInputs();
        }

    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
            
            {/* Page Header */}
            <header className="border-b pb-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Admin User Registration
                </h1>
                <p className="text-gray-500">Create a new system user with administrative privileges.</p>
            </header>

            {/* Registration Form Card */}
            <div className="bg-white p-8 shadow-xl rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <FaUserPlus className="text-blue-600" />
                    <span>New Administrator Details</span>
                </h2>
                
                {/* Message Display */}
                {message && (
                    <div 
                        className={`p-3 mb-4 rounded-lg font-medium flex items-center space-x-3 
                            ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                        `}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    
                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <div className="relative">
                            <FaUserCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter desired username"
                                required
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            />
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            />
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 shadow-md"
                    >
                        {loading ? 'Creating User...' : 'Register Administrator'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAdminUsers;