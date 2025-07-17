import { useEffect, useState } from "react";
import { FaUsers, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";

const AdminDashboard = () => {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    supportTickets: 0,
    totalVolume: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://moy-bank.onrender.com/api/admin/stats"
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

  const cardClasses =
    "flex items-center gap-4 p-6 rounded-2xl shadow-md transition bg-white dark:bg-slate-900 text-gray-900 dark:text-white";

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        🛡️ Admin Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className={cardClasses}>
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold">{stats.users}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Users
            </p>
          </div>
        </div>

        <div className={cardClasses}>
          <FaMoneyBillWave className="text-3xl text-green-500" />
          <div>
            <h2 className="text-xl font-semibold">
              ₦{stats.totalVolume?.toLocaleString()}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Volume
            </p>
          </div>
        </div>

        <div className={cardClasses}>
          <FaChartLine className="text-3xl text-purple-500" />
          <div>
            <h2 className="text-xl font-semibold">{stats.transactions}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transactions
            </p>
          </div>
        </div>

        <div className={cardClasses}>
          <MdSupportAgent className="text-3xl text-red-500" />
          <div>
            <h2 className="text-xl font-semibold">{stats.supportTickets}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Support Messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
