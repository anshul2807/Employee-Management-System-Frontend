import { FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

const UnderDevelopment = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      <div 
        className="
          bg-white 
          p-10 
          md:p-12 
          rounded-xl 
          shadow-2xl 
          text-center 
          max-w-md 
          w-full
        "
      >
        
        {/* Icon Area */}
        <FaCodeBranch 
          className="mx-auto w-16 h-16 text-blue-500 mb-4 animate-pulse" 
          aria-hidden="true" 
        />
        
        {/* Main Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Feature Under Development
        </h1>
        
        {/* Subtitle/Message */}
        <p className="text-lg text-gray-600 mb-6">
          We're actively working on bringing you this feature. Check back soon!
        </p>
        
        {/* Status Indicator */}
        <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
          <FaExclamationTriangle className="w-4 h-4 mr-2" aria-hidden="true" />
          In Progress
        </div>
        
      </div>
    </div>
  );
};

export default UnderDevelopment;