import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit, FaKey, FaImage, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import ThemeSelector from "../components/ThemeSelector";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme } = useTheme(); 

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-xl bg-white dark:bg-gray-950 backdrop-blur-3xl backdrop-opacity-0 shadow-md">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          ⚙️ Account Settings
        </h1>

        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard/edit-profile"
              className="flex items-center gap-3 bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-900 dark:text-white p-4 rounded-lg transition"
            >
              <FaUserEdit />
              <span>Edit Profile</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/change-password"
              className="flex items-center gap-3 bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-900 dark:text-white p-4 rounded-lg transition"
            >
              <FaKey />
              <span>Change Password</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/upload-avatar"
              className="flex items-center gap-3 bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-900 dark:text-white p-4 rounded-lg transition"
            >
              <FaImage />
              <span>Upload Avatar</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="max-w-lg mx-auto mt-3">
        <ThemeSelector />
      </div>

      <div className="max-w-lg mx-auto">
        <button
          onClick={handleLogout}
          className="w-full mt-4 p-4 rounded-xl bg-neutral-900 hover:bg-gray-900 text-white font-semibold flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
