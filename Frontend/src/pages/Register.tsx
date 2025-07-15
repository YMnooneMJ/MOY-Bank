import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: "",
    accountNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Clean phone number and account number inputs
    if (["phoneNumber", "accountNumber"].includes(name)) {
      value = value.replace(/\s+/g, ""); // remove spaces
      if (!/^\d*$/.test(value)) return; // allow only digits
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValidPassword = (pw: string) =>
    pw.length >= 6 && /[A-Z]/.test(pw) && /\d/.test(pw);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://moy-bank.onrender.com/api/auth/register",
        form
      );

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((error: any) => {
          toast.error(error.msg);
        });
      } else {
        toast.error("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Phone Number (11–15 digits)"
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            required
            placeholder="Account Number (10 digits)"
            maxLength={10}
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password (min 6, 1 uppercase, 1 digit)"
              className="w-full px-4 py-2 pr-10 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-8 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <div className="absolute top-3 right-2">
              {form.password.length > 0 &&
                (isValidPassword(form.password) ? (
                  <IoCheckmarkCircle className="text-green-500" />
                ) : (
                  <IoCloseCircle className="text-red-500" />
                ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
