import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true }); // Redirect to dashboard if logged in
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
        Welcome to MOY-Bank 🚀
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Secure. Fast. Digital Banking.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;
