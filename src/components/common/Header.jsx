// Header.jsx
import { useAuth } from "../../context/AuthContext";

const Header = ({ toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded hover:bg-gray-200"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
          />
        </svg>
      </button>

      <h1 className="text-xl font-semibold">EMS Dashboard</h1>

      <button onClick={logout} className="text-red-500 font-semibold">
        Logout
      </button>
    </header>
  );
};

export default Header;
