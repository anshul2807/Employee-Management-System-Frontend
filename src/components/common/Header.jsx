import { useAuth } from '../../context/AuthContext'; 
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-md">
  
      <Link to="/dashboard" className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition duration-150">
        EMS Dashboard
      </Link>
      
      <div className="flex items-center space-x-4">
   
        <span className="text-gray-700 font-medium hidden sm:inline">
          Welcome, {user?.username || 'User'}
        </span>
        
  
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition duration-150 shadow-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;