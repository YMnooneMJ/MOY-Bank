import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername.trim()) {
      toast.error("Please enter your email or username");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://moy-bank.onrender.com/api/auth/forgot-password",
        { emailOrUsername }
      );

      toast.success(res.data?.message || "Reset instructions sent!");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Email or Username"
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
