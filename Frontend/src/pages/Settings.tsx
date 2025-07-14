import { Link, useNavigate } from "react-router-dom";
import {
  FaUserEdit,
  FaKey,
  FaImage,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div className="max-w-lg mx-auto mt-10 p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          ⚙️ Account Settings
        </h1>

        <ul className="space-y-5">
          <li>
            <Link
              to="/edit-profile"
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-lg transition"
            >
              <FaUserEdit />
              <span>Edit Profile</span>
            </Link>
          </li>

          <li>
            <Link
              to="/change-password"
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-lg transition"
            >
              <FaKey />
              <span>Change Password</span>
            </Link>
          </li>

          <li>
            <Link
              to="/upload-avatar"
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-lg transition"
            >
              <FaImage />
              <span>Upload Avatar</span>
            </Link>
          </li>
        </ul>
        <div className="flex gap-1 items-center text-2xl mt-6">
          <FaSun />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              className="sr-only"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <FaMoon />
        </div>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="w-lg mx-auto mt-6 p-4 rounded-xl bg-white dark:bg-gray-900 shadow-md flex items-center justify-center gap-2 text-gray-900 dark:text-white/90 hover:text-gray-600 cursor-pointer"
          title="Logout"
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
