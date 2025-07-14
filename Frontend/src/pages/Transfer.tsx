import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const Transfer = () => {
  const { token } = useAuth();
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!toAccountNumber.trim()) {
      return toast.error("Recipient account number is required.");
    }
    if (!parsedAmount || parsedAmount <= 0) {
      return toast.error("Please enter a valid amount.");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://moy-bank-backend.onrender.com/api/transactions/transfer",
        {
          toAccountNumber,
          amount: parsedAmount,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Transfer successful!");
      setToAccountNumber("");
      setAmount("");
      setDescription("");
    } catch (err: any) {
      console.error("Transfer error", err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Transfer Funds</h2>

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
            required
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
            required
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Transferring..." : "Send Money"}
        </button>
      </form>
    </div>
  );
};

export default Transfer;
