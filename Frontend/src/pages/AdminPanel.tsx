import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface User {
  _id: string;
  fullName: string;
  email: string;
  accountNumber: string;
  balance: number;
  isAdmin: boolean;
  createdAt: string;
}

const AdminPanel = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users if admin
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(
          "https://moy-bank-backend.onrender.com/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(res.data.users);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch user list");
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) {
      fetchAllUsers();
    }
  }, [token, user]);

  // Restrict access for non-admin users
  if (!user?.isAdmin) {
    return (
      <div className="text-center mt-12 text-red-500 font-semibold">
        🚫 You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🛡️ Admin Panel - All Users</h2>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded">
            <thead className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
              <tr className="border-b dark:border-gray-600">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Account #</th>
                <th className="p-3 text-left">Balance (₦)</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t text-sm dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3">{u.fullName}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.accountNumber}</td>
                  <td className="p-3 text-green-600 font-semibold">₦{u.balance.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${u.isAdmin ? 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-white'}`}>
                      {u.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="p-3">{new Date(u.createdAt).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
