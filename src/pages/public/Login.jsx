import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../api/authService';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {getEmployee,login: loginContext} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await authService.login(username, password);
      // console.log(data);
      loginContext(data.user, data.roles); 
      navigate('/dashboard'); 

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Employee Management Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm font-medium p-2 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;