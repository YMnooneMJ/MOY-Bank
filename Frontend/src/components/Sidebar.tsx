import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaWallet,
  FaMoneyBillWave,
  FaComments,
  FaCogs,
  FaUser,
  FaLock,
  FaImage,
  FaUserShield,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-white h-screen p-4 space-y-6 shadow">
      <NavLink
        to="/dashboard"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaTachometerAlt className="inline mr-2" />
        Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/transfer"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaExchangeAlt className="inline mr-2" />
        Transfer
      </NavLink>

      <NavLink
        to="/dashboard/withdraw"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaMoneyBillWave className="inline mr-2" />
        Withdraw
      </NavLink>

      <NavLink
        to="/dashboard/deposit"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaWallet className="inline mr-2" />
        Deposit
      </NavLink>

      <NavLink
        to="/dashboard/transactions"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaExchangeAlt className="inline mr-2" />
        Transactions
      </NavLink>

      <NavLink
        to="/dashboard/profile"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaUser className="inline mr-2" />
        Profile
      </NavLink>

      <NavLink
        to="/dashboard/edit-profile"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaUser className="inline mr-2" />
        Edit Profile
      </NavLink>

      <NavLink
        to="/dashboard/change-password"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaLock className="inline mr-2" />
        Change Password
      </NavLink>

      <NavLink
        to="/dashboard/upload-avatar"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaImage className="inline mr-2" />
        Upload Avatar
      </NavLink>

      <NavLink
        to="/dashboard/support"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaComments className="inline mr-2" />
        Support
      </NavLink>

      {/* Only show to admin users if handled in UI logic */}
      <NavLink
        to="/dashboard/admin"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaUserShield className="inline mr-2" />
        Admin Panel
      </NavLink>
      <NavLink
        to="/dashboard/settings"
        className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
      >
        <FaCogs className="inline mr-2" />
        Settings
      </NavLink>
    </div>
  );
};

export default Sidebar;
