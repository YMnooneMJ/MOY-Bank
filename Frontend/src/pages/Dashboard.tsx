import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  sender: {
    id: string;
    fullName: string;
    accountNumber: string;
  } | null;
  receiver: {
    id: string;
    fullName: string;
    accountNumber: string;
  } | null;
  description: string;
  status: string;
  createdAt: string;
}

const Dashboard = () => {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://moy-bank.onrender.com/api/transactions/history?page=1&limit=5",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions(res.data.transactions);
    } catch (error: any) {
      console.error("Dashboard error:", error.response?.status);
      toast.error(
        error.response?.data?.message || "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Hi👋, {user?.fullName?.split(" ")[0]}
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
          <p className="text-gray-500 dark:text-gray-300 text-sm">Current Balance</p>
          <p className="text-3xl font-bold text-primary dark:text-white">₦{user?.balance?.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
          <p className="text-gray-500 dark:text-gray-300 text-sm">Account Number</p>
          <p className="text-xl font-medium text-gray-900 dark:text-white">
            {user?.accountNumber}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Recent Transactions
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No transactions yet.</p>
        ) : (
          <ul className="space-y-4">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  {tx.type === "deposit" ? (
                    <FaArrowDown className="text-green-500" />
                  ) : tx.type === "withdraw" ? (
                    <FaArrowUp className="text-red-500" />
                  ) : (
                    <FaArrowUp className="text-yellow-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white capitalize">
                      {tx.type} - ₦{tx.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {format(new Date(tx.createdAt), "PPPp")}
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500 dark:text-gray-300">
                  {tx.type === "transfer" && tx.receiver
                    ? `To: ${tx.receiver.accountNumber}`
                    : tx.type === "withdraw" && tx.sender
                    ? `From: ${tx.sender.accountNumber}`
                    : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
