import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserPreview {
  userId: string;
  fullName: string;
  email: string;
  lastMessage: string;
  lastDate: string;
}

const AdminInbox = () => {
  const [inbox, setInbox] = useState<UserPreview[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await axios.get("https://moy-bank.onrender.com/api/chat/inbox");
        setInbox(res.data);
      } catch (error) {
        console.error("Inbox fetch failed:", error);
      }
    };

    fetchInbox();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Support Inbox</h2>
      <div className="space-y-4">
        {inbox.map((item) => (
          <div
            key={item.userId}
            onClick={() => navigate(`/admin/support/${item.userId}`)}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <div className="font-semibold">{item.fullName} ({item.email})</div>
            <div className="text-sm text-gray-500 mt-1">
              {item.lastMessage}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(item.lastDate).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInbox;
