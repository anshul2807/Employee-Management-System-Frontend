import { useEffect, useState } from 'react';
import {useAuth} from '../../context/AuthContext';
import authService from "../../api/authService"
const Profile = () => {
    const {getEmployee,user,employee,roles} = useAuth();
    const [profileLoading,setProfileLoading] = useState(true);
    useEffect(()=>{
        const fetchEmployeeetails = async ()=>{
            if(user != null && user.id != null){
            const fetchEmployeeData = await authService.getUserById(user.id.toString());
            if(fetchEmployeeData.empRef!=null)
                getEmployee(fetchEmployeeData.empRef);
                setProfileLoading(false);
            }
        }
        fetchEmployeeetails();
    },[]);
    
    const SectionItems = [
    { name: 'Information', required: 'Authenticated' },
    { name: 'Password Change', required: 'Authenticated' },
    // ADMIN only routes
    { name: 'Admin Password Change', required: 'ADMIN' }
  ];
    return (
        <div>
            <div className="section1">
                {/* 
                Show User Information and if employee data present show employee details
                user -> user.id, user.name
                roles -> list
                employee -> {id,firstName,lastName,emain,phoneNumber,dateofBirth,address->{street,city,stateProvince,postalCode,country},
                joinDate,jobTitleid,departmentId,managerId,status,totalLeavesBalanceDays}
                */}
            </div>
            <div className="section2">

            </div>
            <div className="section3">

            </div>
        </div>
    );
};

export default Profile;