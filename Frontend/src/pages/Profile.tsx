import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { token, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://moy-bank-backend.onrender.com/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          avatar: res.data.avatar || "",
        });
      } catch (err) {
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(
        "https://moy-bank-backend.onrender.com/api/users/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profile updated");
      updateUser(res.data); // Update context
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Profile</h2>

      {formData.avatar && (
        <div className="flex justify-center mb-4">
          <img
            src={formData.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-white dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-white dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="avatar" className="block text-sm font-medium mb-1">
            Avatar URL
          </label>
          <input
            id="avatar"
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900 dark:text-white"
            placeholder="https://example.com/avatar.png"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
