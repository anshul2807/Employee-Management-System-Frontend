import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import authService from "../../api/authService";
import { FaUserCircle, FaEnvelope, FaBuilding} from 'react-icons/fa'; 
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Profile = () => {
    const { getEmployee, user, employee, roles,hasRole } = useAuth();
    const [profileLoading, setProfileLoading] = useState(true);
    const [passwordData, setPasswordData] = useState('');
    const [confirmPasswordData, setConfirmPasswordData] = useState('');
    const [toastPasswordUpdate, setToastPasswordUpdate] = useState('');
    const [adminUsernameData, setAdminUsernameData] = useState('');
    const [adminPasswordData, setAdminPasswordData] = useState('');
    const [adminConfirmPasswordData, setAdminConfirmPasswordData] = useState('');
    const [toastAdminPasswordUpdate, setToastAdminPasswordUpdate] = useState('');


    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            if (user && user.id) {
                try {

                    const fetchUserData = await authService.getUserById(user.id);
                
                    if (fetchUserData && fetchUserData.empRef) {
                        getEmployee(fetchUserData.empRef);
                        // console.log(employee);
                    }
                } catch (error) {
                    console.error("Failed to fetch user/employee details:", error);
                } finally {
                    setProfileLoading(false);
                }
            } else {
                setProfileLoading(false);
            }
        };
        fetchEmployeeDetails();
    }, [user,getEmployee]); 

    if (profileLoading) {
        return <LoadingSpinner message="Loading Profile!!" />;
    }

    const hadlePasswordChange = async (e) => {
        if(passwordData.length < 6) {
            setToastPasswordUpdate('Password must be at least 6 characters long.');
            return;
        }
        if(passwordData !== confirmPasswordData) {
            setToastPasswordUpdate('Passwords do not match.');
            return;
        }
        const updatePassword = await authService.changePassword({password:passwordData});
        setToastPasswordUpdate(updatePassword);

        setPasswordData('');
        setConfirmPasswordData('');
        setTimeout(() => {
            setToastPasswordUpdate('');
        }, 5000);
        
    }
    const handleAdminPasswordChange = async (e) => {
        if(adminUsernameData.trim() === '') {
            setToastAdminPasswordUpdate('Username cannot be empty.');
            return;
        }
        if(adminPasswordData.length < 6) {
            setToastAdminPasswordUpdate('Password must be at least 6 characters long.');
            return;
        }
        if(adminPasswordData !== adminConfirmPasswordData) {
            setToastAdminPasswordUpdate('Passwords do not match.');
            return;
        }
        try {
            const updatePassword = await authService.adminChangePassword(adminUsernameData,adminPasswordData);
            setToastAdminPasswordUpdate(updatePassword);
        } catch (err) {
            setToastAdminPasswordUpdate("Error updating password. Please ensure the username is correct.");
        }
        finally{
            setAdminPasswordData('');
            setAdminConfirmPasswordData('');
            setAdminUsernameData('');
            setTimeout(() => {
                setToastAdminPasswordUpdate('');
            }, 5000);
        }
        
    }

    const renderAddress = (address) => {
        if (!address) return "N/A";
        return (
            <div className="text-sm text-gray-700 space-y-1">
                <p>{address.street}</p>
                <p>{address.city}, {address.stateProvince} {address.postalCode}</p>
                <p>{address.country}</p>
            </div>
        );
    };
    const DetailRowAddress = ({ icon: Icon, label, value }) => (
        <div className="flex items-center space-x-3 p-3 border-b border-gray-100 last:border-b-0">
            <Icon className="text-blue-500 w-5 h-5" />
            <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
                <div className="text-base font-semibold text-gray-800">{value || 'N/A'}</div>
            </div>
        </div>
    );

    const DetailRow = ({ icon: Icon, label, value }) => (
        <div className="flex items-center space-x-3 p-3 border-b border-gray-100 last:border-b-0">
            <Icon className="text-blue-500 w-5 h-5" />
            <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
                <p className="text-base font-semibold text-gray-800">{value || 'N/A'}</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 border-b pb-2">My Profile</h1>
            
            {/* SECTION 1: User and Employee Information */}
            <div className="section1 bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Account Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DetailRow icon={FaUserCircle} label="Username" value={user?.username} />
                        <DetailRow icon={FaEnvelope} label="Account ID" value={user?.id} />
                        <DetailRow icon={FaBuilding} label="Roles" value={roles?.join(', ') || 'N/A'} />
                        {/* You can add more user-specific details here */}
                    </div>
                </div>

                {(employee) ? (
                    <div className="p-6 border-t border-gray-200">
                        <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">Employee Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailRow icon={FaBuilding} label="Employee ID" value={`${employee.id}`} />
                            <DetailRow icon={FaUserCircle} label="Full Name" value={`${employee.fullName}`} />
                            <DetailRow icon={FaEnvelope} label="Email" value={employee.email} />
                            <DetailRow icon={FaBuilding} label="Job Title ID" value={employee.jobTitleId || 'N/A'} />
                            <DetailRow icon={FaBuilding} label="Department ID" value={employee.departmentId || 'N/A'} />
                            <DetailRow icon={FaBuilding} label="Join Date" value={employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A'} />
                            <DetailRow icon={FaBuilding} label="Leave Balance (Days)" value={employee.totalLeavesBalanceDays} />
                            
                            {/* Address Details */}
                            <div className="md:col-span-2">
                                <DetailRowAddress 
                                    icon={FaBuilding} 
                                    label="Address" 
                                    value={renderAddress(employee.address)} 
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 border-t border-gray-200 text-gray-500">
                        Employee profile data not available.
                    </div>
                )}
                
            </div>

            {/* SECTION 2: Update Password */}
            <div className="section2 bg-white shadow-xl rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">🔐 Change Your Password</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); hadlePasswordChange(); }} className="space-y-6">
                    {/* 1. New Password Input */}
                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            name="new-password"
                            value={passwordData}
                            onChange={(e) => setPasswordData(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                    </div>

                    {/* 2. Confirm Password Input */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPasswordData}
                            onChange={(e) => setConfirmPasswordData(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                    </div>

                    {/* 3. Update Button */}
                    <button 
                        type="submit" 
                        className="w-full p-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg disabled:bg-blue-300"
                        disabled={!passwordData || passwordData !== confirmPasswordData}
                    >
                        Update Password
                    </button>
                </form>
                
                {/* 4. Toast/Feedback Message */}
                {toastPasswordUpdate && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium 
                        ${toastPasswordUpdate.includes('Updated') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                    `}>
                        {toastPasswordUpdate}
                    </div>
                )}
            </div>
            {/* Section 3: Change Anyones Password */}
        {hasRole('ADMIN') &&(
        <div className="section3 bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">🛡️ Admin: Change User Password</h2>
    
        <form 
            onSubmit={(e) => { 
                e.preventDefault(); 
                // Assuming handleAdminPasswordChange handles validation and submission
                handleAdminPasswordChange(); 
            }} 
            className="space-y-6"
        >
        {/* 1. Target Username Input */}
        <div>
            <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 mb-1">
                Target Username
            </label>
            <input
                type="text"
                id="admin-username"
                placeholder='Enter Username' 
                value={adminUsernameData} 
                onChange={e => setAdminUsernameData(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
        </div>
        
        {/* 2. New Password Input */}
        <div>
            <label htmlFor="admin-new-password" className="block text-sm font-medium text-gray-700 mb-1">
                User New Password
            </label>
            <input
                type="password"
                id="admin-new-password"
                placeholder='Enter User New Password' 
                value={adminPasswordData} 
                onChange={e => setAdminPasswordData(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
        </div>
        
        {/* 3. Confirm Password Input */}
        
            <div>
                    <label htmlFor="admin-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="admin-confirm-password"
                        placeholder='Enter User Confirm Password' 
                        value={adminConfirmPasswordData} 
                        onChange={e => setAdminConfirmPasswordData(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                </div>
                
                {/* 4. Submission Button */}
                <button 
                    type="submit" 
                    className="w-full p-3 text-white bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-md hover:shadow-lg disabled:bg-red-300"
                    // Example basic validation: Disable if passwords don't match or fields are empty
                    disabled={!adminUsernameData || !adminPasswordData || adminPasswordData !== adminConfirmPasswordData}
                >
                    Change User Password
                </button>
                </form>
                
                {/* 5. Toast/Feedback Message */}
                {toastAdminPasswordUpdate && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium 
                        ${toastAdminPasswordUpdate.includes('Updated') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                    `}>
                        {toastAdminPasswordUpdate}
                    </div>
                )}
        </div>
        )}
            
        </div>
    );
};

export default Profile;