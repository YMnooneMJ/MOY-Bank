import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      role="alert"
    >
      <h1 className="text-6xl md:text-7xl font-extrabold text-red-600 mb-4">
        404
      </h1>
      <p className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found 🙁
      </p>
      <p className="text-gray-600 mb-6 max-w-md">
        Oops! The page you're looking for doesn’t exist or may have been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
