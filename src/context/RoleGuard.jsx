import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RoleGuard = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if the user is authenticated (if required)
  if (requiredRole === 'Authenticated' && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check specific role (e.g., ADMIN)
  if (requiredRole !== 'Authenticated' && !hasRole(requiredRole)) {
    // Redirect to dashboard or a 403 Forbidden page
    return <Navigate to="/dashboard" replace />; 
  }
  
  return children;
};
export default RoleGuard;