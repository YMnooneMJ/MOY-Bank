import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import DownloadStatement from "../components/DownloadStatement";

interface User {
  fullName: string;
  accountNumber: string;
  balance: number;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  sender?: {
    id: string;
    fullName: string;
    accountNumber: string;
  };
  receiver?: {
    id: string;
    fullName: string;
    accountNumber: string;
  };
  description: string;
  status: string;
  createdAt: string;
}

const Dashboard = () => {
  const { token, user } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!token) return; // Don't run if token is not available

    const fetchData = async () => {
      try {
        const [userRes, txRes] = await Promise.all([
          axios.get("https://moy-bank.onrender.com/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://moy-bank.onrender.com/api/transactions/history", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCurrentUser(userRes.data);
        setTransactions(txRes.data.transactions);
      } catch (err: any) {
        console.error("Dashboard error:", err.response?.status, err.response?.data);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Dashboard</h2>

      {/* Account Info */}
      {currentUser && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow mb-6">
          <p className="text-lg font-semibold mb-1">
            Hello, {currentUser.fullName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Account Number: {currentUser.accountNumber}
          </p>
          <p className="text-2xl mt-4 font-bold text-green-600 dark:text-green-400">
            ₦{currentUser.balance.toLocaleString()}
          </p>
        </div>
      )}

      {/* Statement Download */}
      <DownloadStatement transactions={transactions} />

      {/* Recent Transactions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.length === 0 ? (
            <p className="p-4 text-gray-500">No recent transactions</p>
          ) : (
            transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="p-4 flex justify-between items-start">
                <div>
                  <p className="font-semibold capitalize">{tx.type}</p>
                  <p className="text-sm text-gray-500">
                    {tx.type === "transfer" && tx.sender?.id === user?._id
                      ? `To ${tx.receiver?.fullName}`
                      : tx.sender?.fullName
                      ? `From ${tx.sender.fullName}`
                      : tx.description || "No description"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(tx.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold text-lg ${
                      tx.type === "deposit"
                        ? "text-green-600 dark:text-green-400"
                        : tx.type === "withdrawal"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    ₦{tx.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 text-right">
                    {tx.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
