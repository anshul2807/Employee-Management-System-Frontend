import { Routes, Route} from 'react-router-dom';
import LoginPage from '../pages/public/Login';
import Dashboard from '../pages/private/Dashboard';
import ProfilePage from '../pages/private/Profile';
import EmployeeListPage from '../pages/private/EmployeeList';
// import LookupsPage from '../pages/private/Lookups';
import NotFoundPage from '../pages/public/NotFound';
import RoleGuard from '../context/RoleGuard';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const InitialRedirect = () => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <LoadingSpinner />;
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Authenticated Routes (Requires any logged-in user) */}
            <Route path="/dashboard" element={
                <RoleGuard requiredRole="Authenticated"><Dashboard /></RoleGuard>
            } />
            <Route path="/profile" element={
                <RoleGuard requiredRole="Authenticated"><ProfilePage /></RoleGuard>
            } />

            {/* ADMIN ONLY Routes */}
            <Route path="/employees" element={
                <RoleGuard requiredRole="ADMIN"><EmployeeListPage /></RoleGuard>
            } />
            <Route path="/lookups" element={
                <RoleGuard requiredRole="ADMIN">
                <h1>Lookup page</h1>    
                </RoleGuard>
            } />

            {/* Redirect '/' to '/dashboard' if authenticated, or '/login' if not */}
            <Route path="/" element={<InitialRedirect />} />
            
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
export default AppRouter;