import { useAuth } from '../../context/AuthContext'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { hasRole } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', required: 'Authenticated' },
    { name: 'My Profile', path: '/profile', required: 'Authenticated' },
    // ADMIN only routes
    { name: 'Employee List', path: '/employees', required: 'ADMIN' },
    { name: 'Lookups', path: '/lookups', required: 'ADMIN' },
    {name:'List of Employees',path:'/manager-employees',required:'MANAGER' },
    {name:'Create Admin Users',path:'/create-admin-users',required:'ADMIN'},
    {name:'Register Employee',path:'/register-employee',required:'ADMIN'},
    
  ];
  
  return (
    <div className="w-64 bg-indigo-800 text-white flex flex-col p-4 shadow-xl hidden md:block">
      <h1 className="text-2xl font-bold mb-8 border-b border-indigo-700 pb-4">
        EMS Navigation
      </h1>
      <nav className="flex-grow">
        <ul className="space-y-3">
          {navItems.map(item => (
           
            (hasRole(item.required) || item.required === 'Authenticated') && (
              <li key={item.name}>
                <Link
                  to={item.path}
                  
                  className="block p-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {item.name}
                </Link>
              </li>
            )
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;