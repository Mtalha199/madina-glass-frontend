import { SCREEN_PATH } from "@/Constant";
import { Link } from "react-router-dom";


const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl transform transition-all hover:scale-105 max-w-md">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 animate-pulse">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mt-2 mb-6">
          It seems you’ve wandered off the path. The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link
          to={SCREEN_PATH.DASHBOARD}
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;