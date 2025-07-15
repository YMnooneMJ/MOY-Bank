import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return toast.error("Password is too weak.");
    if (password !== confirm) return toast.error("Passwords do not match.");

    try {
      setLoading(true);
      const res = await axios.post(
        `https://moy-bank.onrender.com/api/auth/reset-password/${token}`,
        { password }
      );
      toast.success(res.data?.message || "Password reset successful!");
      navigate("/login");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Reset failed. Token may be invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              className="w-full px-4 py-2 pr-10 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div
              onClick={() => setShow(!show)}
              className="absolute top-3 right-8 cursor-pointer text-gray-500"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </div>
            <div className="absolute top-3 right-2">
              {password.length > 0 &&
                (isValid ? (
                  <IoCheckmarkCircle className="text-green-500" />
                ) : (
                  <IoCloseCircle className="text-red-500" />
                ))}
            </div>
          </div>

          {/* Confirm Password */}
          <input
            type={show ? "text" : "password"}
            name="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
