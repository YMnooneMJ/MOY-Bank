import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
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
import { useEffect } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Auto-close sidebar on route change (mobile only)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden p-4 flex items-center justify-between bg-white dark:bg-black shadow">
        <h2 className="text-xl font-bold dark:text-white">MOY-Bank</h2>
        <button onClick={toggleSidebar} className="text-xl text-gray-700 dark:text-white">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar container */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 z-40 transform bg-white dark:bg-black text-gray-800 dark:text-white shadow-md p-4 space-y-4
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:block
        `}
      >
        <nav className="space-y-7 mt-10 md:mt-0">
          <SidebarLink to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <SidebarLink to="/dashboard/transfer" icon={<FaExchangeAlt />} label="Transfer" />
          <SidebarLink to="/dashboard/withdraw" icon={<FaMoneyBillWave />} label="Withdraw" />
          <SidebarLink to="/dashboard/deposit" icon={<FaWallet />} label="Deposit" />
          <SidebarLink to="/dashboard/transactions" icon={<FaExchangeAlt />} label="Transactions" />
          <SidebarLink to="/dashboard/profile" icon={<FaUser />} label="Profile" />
          <SidebarLink to="/dashboard/edit-profile" icon={<FaUser />} label="Edit Profile" />
          <SidebarLink to="/dashboard/change-password" icon={<FaLock />} label="Change Password" />
          <SidebarLink to="/dashboard/upload-avatar" icon={<FaImage />} label="Upload Avatar" />
          <SidebarLink to="/dashboard/settings" icon={<FaCogs />} label="Settings" />
          <SidebarLink to="/dashboard/support" icon={<FaComments />} label="Support" />
          <SidebarLink to="/dashboard/admin" icon={<FaUserShield />} label="Admin Panel" />
        </nav>
      </aside>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

const SidebarLink = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded transition-colors ${
        isActive
          ? "bg-blue-100 dark:bg-gray-800 font-semibold"
          : "hover:bg-gray-100 dark:hover:bg-gray-900"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
