import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";

const Transfer = () => {
  const { token, user } = useAuth();
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const socket = io("https://moy-bank.onrender.com", {
    auth: { token },
  });

  // 🔄 Fetch current balance
  const fetchBalance = async () => {
    try {
      const res = await axios.get("https://moy-bank.onrender.com/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(res.data.user.balance);
    } catch (err) {
      console.error("Failed to fetch balance");
    }
  };

  useEffect(() => {
    fetchBalance();

    socket.on("transfer-confirmation", (data) => {
      if (data?.status === "success") {
        toast.success("✅ Transfer confirmed in real-time");
        navigate("/transactions");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!toAccountNumber.trim()) return toast.error("Recipient is required.");
    if (!parsedAmount || parsedAmount <= 0) return toast.error("Invalid amount.");
    if (user?.accountNumber === toAccountNumber)
      return toast.error("You cannot transfer to yourself.");

    setLoading(true);

    try {
      const res = await axios.post(
        "https://moy-bank.onrender.com/api/transactions/transfer",
        { toAccountNumber, amount: parsedAmount, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Emit socket confirmation to backend (optional advanced feature)
      socket.emit("transfer-initiated", {
        fromId: user.id,
        amount: parsedAmount,
      });

      toast.success(res.data.message || "Transfer successful!");
      setToAccountNumber("");
      setAmount("");
      setDescription("");

      setTimeout(() => {
        navigate("/transactions");
      }, 1200);
    } catch (err: any) {
      console.error("Transfer error", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
    >
      <h2 className="text-2xl font-semibold mb-2">Transfer Funds</h2>
      {balance !== null && (
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-300">
          Current Balance: <span className="font-bold text-green-600 dark:text-green-400">₦{balance.toLocaleString()}</span>
        </p>
      )}

      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label htmlFor="account" className="block text-sm mb-1">
            Recipient Account Number
          </label>
          <input
            id="account"
            type="text"
            value={toAccountNumber}
            onChange={(e) => setToAccountNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            placeholder="Enter account number"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm mb-1">
            Amount (₦)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            placeholder="Enter amount"
            min={1}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm mb-1">
            Description (optional)
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            placeholder="e.g. Rent payment"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Transferring..." : "Send Money"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Transfer;
