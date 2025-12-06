import  { useState, useEffect } from 'react';
import Table from '../../components/tables/Table'; 
import LoadingSpinner from '../../components/common/LoadingSpinner';
import authService from '../../api/authService';
import employeeService from '../../api/employeeService';


const EmployeeList = () => {
    
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState({status:false,id:null});
    

    useEffect(() => {
        const fetchAllEmployees = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await authService.listAllUsers();

                const mockResponse = response || [];
                const filterResponse = mockResponse.filter(user => user && user.empRef);

  
                const mappedData = filterResponse.map(user => {
                    const emp = user.empRef;
                    
                    const formatAddress = (addr) => {
                        if (!addr) return 'N/A';
                        return `${addr.street}, ${addr.city}, ${addr.country}`;
                    };
                    
                    return {
                    
                        userId: user.id,
                        username: user.username,

                        employeeId: emp?.id || 'N/A',
                        fullName: emp?.fullName || 'N/A',
                        email: emp?.email || 'N/A',
                        phoneNumber: emp?.phoneNumber || 'N/A',
                        joinDate: emp?.joinDate ? new Date(emp.joinDate).toLocaleDateString() : 'N/A',
                        dob: emp?.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : 'N/A',
                        
                        jobTitleId: emp?.jobTitleId || 'N/A',
                        departmentId: emp?.departmentId || 'N/A',
                        managerId: emp?.managerId || 'N/A',
                        
                        leaveBalance: emp?.totalLeaveBalanceDays || 0,
                        status: user.enabled ? 'Active' : 'Inactive',
                        address: formatAddress(emp?.address),
                    };
                });

                setEmployeeData(mappedData);

            } catch (err) {
                setError("Failed to load employee list.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllEmployees();
    }, [isDeleting]);

    const handleDelete = async (userId) => {
        setIsDeleting({status:true,id:userId});
        try {
            const response = await employeeService.terminateEmployee(userId);
            console.log(response);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }finally{
            setIsDeleting({status:false,id:null});
        }
    }

    const employeeColumns = [
        { header: 'User Id', accessor: 'userId' },
        { header: 'Full Name', accessor: 'fullName' },
        { header: 'Username', accessor: 'username' },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phoneNumber' },
        { header: 'Joined', accessor: 'joinDate' },
        { header: 'Job Title ID', accessor: 'jobTitleId' },
        { header: 'Department ID', accessor: 'departmentId' },
        { header: 'Leave Bal.', accessor: 'leaveBalance' },
        { header: 'Status', accessor: 'status' },
        { header: 'Address', accessor: 'address' },
        { header: 'Employee ID', accessor: 'employeeId' },
        { header: 'Manager ID', accessor: 'managerId' },
        { header: 'DOB', accessor: 'dob' },
        { 
            header: 'Actions', 
            accessor: 'actions', 
            // 💡 This renderer function tells the Table component *how* to draw the cell
            render: (row) => (
                <button
                    onClick={() => handleDelete(row.userId)}
                    disabled={!isDeleting.status && isDeleting.id===row.userId ? true : false}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-150 disabled:bg-red-300"
                >
                    {isDeleting.status && isDeleting.id==row.userId ? 'Deleting...' : 'Delete'}
                </button>
            )
        }
    ];


    if (loading) {
        return <LoadingSpinner message="Fetching Employee Directory..." />;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600 bg-red-50 rounded-lg shadow-md max-w-lg mx-auto">{error}</div>;
    }

    return (
        <div className="max-w-full mx-auto p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
                <p className="text-gray-500">View all active and inactive user accounts and their associated employee details.</p>
            </header>

            <Table 
                title="Total Employees" 
                data={employeeData} 
                columns={employeeColumns} 
            />
        </div>
    );
};

export default EmployeeList;