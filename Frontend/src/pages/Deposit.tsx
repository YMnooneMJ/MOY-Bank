import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Deposit = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // Track request state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      return toast.error("Please enter a valid deposit amount.");
    }

    setLoading(true); // Begin loading state

    try {
      const res = await axios.post(
        "https://moy-bank.onrender.com/api/transactions/deposit",
        {
          amount: parseFloat(amount),
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Deposit successful!");
      setAmount(""); // Optional: clear input
      setDescription(""); // Optional: clear input
      navigate("/"); // Redirect to dashboard
    } catch (err: any) {
      console.error("Deposit error:", err);
      toast.error(
        err?.response?.data?.message || "Failed to process deposit."
      );
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 mt-10 rounded-xl shadow space-y-5">
      <h2 className="text-2xl font-bold mb-2">Deposit Funds</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount (₦)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description (optional)
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Deposit"}
        </button>
      </form>
    </div>
  );
};

export default Deposit;
