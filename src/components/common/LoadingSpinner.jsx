const LoadingSpinner = ({ message = "Please wait..." }) => {
  return (
    // Outer container fixed to cover the entire viewport
    <div 
      className="
        fixed 
        inset-0 
        z-50 
        flex 
        items-center 
        justify-center 
        bg-gray-900 
        bg-opacity-70 
        transition-opacity
      "
    >
      {/* Inner card/box for the loader content */}
      <div 
        className="
          bg-white 
          p-6 
          rounded-xl 
          shadow-2xl 
          flex 
          flex-col 
          items-center 
          space-y-4
        "
      >
        {/* The Spinning Graphic (Tailwind's built-in spinner style) */}
        <div 
          className="
            animate-spin 
            rounded-full 
            h-10 
            w-10 
            border-t-4 
            border-r-4 
            border-blue-600 
            border-opacity-75
          "
        ></div>
        
        {/* The Message */}
        <p className="text-base font-medium text-gray-800">
          {message}
        </p>

      </div>
    </div>
  );
}
export default LoadingSpinner;