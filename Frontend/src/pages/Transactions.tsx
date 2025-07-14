import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Define the shape of each transaction
type Transaction = {
  id: string;
  type: string;
  amount: number;
  sender?: {
    fullName: string;
    accountNumber: string;
  };
  receiver?: {
    fullName: string;
    accountNumber: string;
  };
  description: string;
  status: string;
  createdAt: string;
};

const Transactions = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transaction history on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          "https://moy-bank-backend.onrender.com/api/transactions/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(res.data.transactions);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-300">
          Loading...
        </div>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
          <table className="w-full text-sm table-auto border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-900 text-left">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Sender</th>
                <th className="p-3">Receiver</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <td className="p-3 capitalize">{txn.type}</td>
                  <td className="p-3 text-green-600 font-medium">
                    ₦{new Intl.NumberFormat("en-NG").format(txn.amount)}
                  </td>
                  <td className="p-3">
                    {txn.sender
                      ? `${txn.sender.fullName} (${txn.sender.accountNumber})`
                      : "—"}
                  </td>
                  <td className="p-3">
                    {txn.receiver
                      ? `${txn.receiver.fullName} (${txn.receiver.accountNumber})`
                      : "—"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        txn.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">
                    {new Date(txn.createdAt).toLocaleString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
