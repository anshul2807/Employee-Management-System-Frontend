import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 Error</p>
        <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-base text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;