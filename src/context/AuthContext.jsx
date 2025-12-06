import { createContext, useState, useEffect, useContext } from 'react';
export const AuthContext = createContext(null);
import {jwtDecode} from 'jwt-decode'; 

const decodeToken = (token) => {
  if (!token) return { roles: [], user: null };

  try {

    const decoded = jwtDecode(token);
    return { 
      roles: decoded.role || [], 
      user: { id: decoded.id, username: decoded.sub } 
    };

  } catch (error) {
    console.error("Failed to decode token:", error);
    return { roles: [], user: null };
  }
};


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee,setEmployee]=useState(null);
  // const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
     
      const { roles: decodedRoles, user: decodedUser } = decodeToken(token);
      if (decodedUser) {
        setIsAuthenticated(true);
        setUser(decodedUser);
        setRoles(decodedRoles);
      } else {
        
        localStorage.removeItem('jwtToken');
      }
    }
    setLoading(false);
  }, []);

  
  const login = (userData, userRoles) => {
    
    setIsAuthenticated(true);
    setUser(userData); 
    setRoles(userRoles); 
    
  };

  
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    setUser(null);
    setRoles([]);
    setEmployee(null);
  };

  
  const hasRole = (requiredRoles) => {
    if (loading) return false;
    
    const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    if (required.includes('Authenticated')) {
        return isAuthenticated;
    }
    // Checking if the user's roles overlap with the required roles
    return required.some(role => roles.includes(role));
  };

  const getEmployee = (employeeData) => {
    setEmployee(employeeData);
  }

  const contextValue = {
    isAuthenticated,
    user,
    roles,
    loading,
    employee,
    login,
    logout,
    hasRole,
    getEmployee
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};



// 3. Custom Hook for easy access to AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};