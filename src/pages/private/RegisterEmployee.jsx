import { useState } from "react";
import employeeService from "../../api/employeeService";
import InputField from "../../ui/InputField";

const RegisterEmployee = () => {
    const [employeeInput, setEmployeeInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        address : {
            street: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            country: ''
        },
        joinDate: '',  
        departmentId: '',
        jobTitleId: '',
        managerId: ''
    });
    const [registerMessage, setRegisterMessage] = useState(null);

    // 1. Handler for regular (flat) fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeInput(prev => ({
            ...prev,
            [name]: value
        }));

    };

    // 2. Handler for nested 'address' fields
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEmployeeInput(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }));
    };
    
    // --- VALIDATION HELPER ---
    const validateEmployeeData = (data) => {
        // Regex for basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Regex for a common international phone number format (allows spaces, dashes, parentheses)
        
        // 1. Check required fields (using your existing logic)
        if (!data.firstName || !data.lastName || !data.email 
            || !data.departmentId || !data.address.street 
            || !data.address.city || !data.address.stateProvince 
            || !data.address.postalCode || !data.address.country 
            || !data.dateOfBirth || !data.joinDate || !data.phoneNumber 
            || !data.jobTitleId)
        {
            return "Please fill in all required fields.";
        }
        
        // 2. Check email format
        if (!emailRegex.test(data.email)) {
            return "Invalid email format.";
        }
        
        

        // Add more specific ID checks if needed (e.g., departmentId must be a number)
        // if (isNaN(data.departmentId)) { return "Department ID must be a number."; }

        return null; // Validation passed
    }

    const handleRegisterEmployee = async(e) =>{
        e.preventDefault();
        setRegisterMessage(null); 

        // Run client-side validation
        const validationError = validateEmployeeData(employeeInput);
        if (validationError) {
            setRegisterMessage({ message: validationError, type: 'error' });
            setTimeout(() => setRegisterMessage(null), 8000);
            return;
        }
        if(employeeInput.managerId === ''){
            employeeInput.managerId = null;
        }
        // console.log("Registering Employee:", employeeInput);

        try {
            await employeeService.createEmployee(employeeInput);
            const generatedUser = employeeInput.email.split('@')[0];
            setRegisterMessage({ message: `Employee registered successfully also User **${generatedUser}** has been created with default password!!`, type: 'success' });
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to register employee. Please try again.";
            // console.log(err);
            setRegisterMessage({ message: errorMessage, type: 'error' });
        }finally{
            // Reset form fields
            setEmployeeInput({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                dateOfBirth: '',
                address : {
                    street: '',
                    city: '',
                    stateProvince: '',
                    postalCode: '',
                    country: ''
                },
                joinDate: '',  
                departmentId: '',
                jobTitleId: '',
                managerId: ''
            });

            setTimeout(() => {
                setRegisterMessage(null);
            }, 8000);
        }

    }

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

    

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">✍️ Register New Employee</h2>
            
            {registerMessage && (
                <AlertMessage message={registerMessage.message} type={registerMessage.type} />
            )}

            <form onSubmit={handleRegisterEmployee} className="space-y-6">
                
                {/* === PERSONAL DETAILS SECTION === */}
                <h3 className="text-xl font-semibold text-indigo-700 pt-4 border-t mt-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                        label="First Name *" 
                        id="firstName" 
                        name="firstName" 
                        value={employeeInput.firstName} 
                        onChange={handleInputChange} 
                        placeholder="John"
                    />
                    <InputField 
                        label="Last Name *" 
                        id="lastName" 
                        name="lastName" 
                        value={employeeInput.lastName} 
                        onChange={handleInputChange} 
                        placeholder="Doe"
                    />
                    <InputField 
                        label="Email Address *" 
                        id="email" 
                        name="email" 
                        type="email"
                        value={employeeInput.email} 
                        onChange={handleInputChange} 
                        placeholder="john.doe@example.com"
                    />
                    <InputField 
                        label="Phone Number *" 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        value={employeeInput.phoneNumber} 
                        onChange={handleInputChange} 
                        placeholder="(555) 123-4567"
                    />
                    <InputField 
                        label="Date of Birth *" 
                        id="dateOfBirth" 
                        name="dateOfBirth" 
                        type="date"
                        value={employeeInput.dateOfBirth} 
                        onChange={handleInputChange} 
                    />
                </div>

                {/* === ADDRESS SECTION === */}
                <h3 className="text-xl font-semibold text-indigo-700 pt-4 border-t mt-4">Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                        label="Street Address *" 
                        id="street" 
                        name="street" 
                        value={employeeInput.address.street} 
                        onChange={handleAddressChange} 
                        placeholder="123 Main St"
                    />
                    <InputField 
                        label="City *" 
                        id="city" 
                        name="city" 
                        value={employeeInput.address.city} 
                        onChange={handleAddressChange} 
                        placeholder="Anytown"
                    />
                    <InputField 
                        label="State/Province *" 
                        id="stateProvince" 
                        name="stateProvince" 
                        value={employeeInput.address.stateProvince} 
                        onChange={handleAddressChange} 
                        placeholder="CA"
                    />
                    <InputField 
                        label="Postal Code *" 
                        id="postalCode" 
                        name="postalCode" 
                        value={employeeInput.address.postalCode} 
                        onChange={handleAddressChange} 
                        placeholder="90210"
                    />
                    <InputField 
                        label="Country *" 
                        id="country" 
                        name="country" 
                        value={employeeInput.address.country} 
                        onChange={handleAddressChange} 
                        placeholder="USA"
                    />
                </div>

                {/* === EMPLOYMENT DETAILS SECTION === */}
                <h3 className="text-xl font-semibold text-indigo-700 pt-4 border-t mt-4">Employment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                        label="Join Date *" 
                        id="joinDate" 
                        name="joinDate" 
                        type="date"
                        value={employeeInput.joinDate} 
                        onChange={handleInputChange} 
                    />
                    <InputField 
                        label="Department ID *" 
                        id="departmentId" 
                        name="departmentId" 
                        value={employeeInput.departmentId} 
                        onChange={handleInputChange} 
                        placeholder="e.g., 101"
                    />
                    <InputField 
                        label="Job Title ID *" 
                        id="jobTitleId" 
                        name="jobTitleId" 
                        value={employeeInput.jobTitleId} 
                        onChange={handleInputChange} 
                        placeholder="e.g., 502"
                    />
                    <InputField 
                        label="Manager ID" 
                        id="managerId" 
                        name="managerId" 
                        value={employeeInput.managerId} 
                        onChange={handleInputChange} 
                        placeholder="e.g., 205 (Optional)"
                    />
                </div>

                {/* === SUBMIT BUTTON === */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mt-8"
                >
                    Register Employee
                </button>
            </form>
        </div>
    );
}
export default RegisterEmployee;