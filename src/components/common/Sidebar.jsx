import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { hasRole } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', required: 'Authenticated' },
    { name: 'My Profile', path: '/profile', required: 'Authenticated' },
    { name: 'Employee List', path: '/employees', required: 'ADMIN' },
    { name: 'Lookups', path: '/lookups', required: 'ADMIN' },
    { name:'List of Employees', path:'/manager-employees', required:'MANAGER' },
    { name:'Create Admin Users', path:'/create-admin-users', required:'ADMIN'},
    { name:'Register Employee', path:'/register-employee', required:'ADMIN'},
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-indigo-800 text-white 
          flex flex-col p-4 shadow-xl transform transition-transform duration-300 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:block z-50
        `}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden self-end mb-4 p-2 rounded hover:bg-indigo-700"
          onClick={closeSidebar}
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-8 border-b border-indigo-700 pb-4">
          EMS Navigation
        </h1>

        <nav className="flex-grow">
          <ul className="space-y-3">
            {navItems.map(item =>
              (hasRole(item.required) || item.required === 'Authenticated') && (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block p-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-150"
                    onClick={closeSidebar} // auto-close on mobile
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
