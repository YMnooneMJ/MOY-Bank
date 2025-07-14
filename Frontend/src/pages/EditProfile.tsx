import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const EditProfile: React.FC = () => {
  const { token } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://moy-bank-backend.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          fullName: res.data.fullName,
          email: res.data.email,
        });
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load profile.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        "https://moy-bank-backend.onrender.com/api/users/profile",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">✏️ Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
