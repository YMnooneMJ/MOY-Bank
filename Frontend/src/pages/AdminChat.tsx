import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import axios from "axios";

interface Message {
  _id?: string;
  text: string;
  from: string;
  fromSupport?: boolean;
  userId: string;
  createdAt?: string;
}

const AdminChat = () => {
  const { user, token } = useAuth();
  const { isDarkMode } = useTheme();
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [userList, setUserList] = useState<{ userId: string; lastMessage: string }[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Scroll to bottom on message change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat inbox user list on mount
  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    const fetchInbox = async () => {
      try {
        const res = await axios.get("https://moy-bank.onrender.com/api/support/inbox", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserList(res.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load inbox");
      }
    };
    fetchInbox();
  }, [token, user?.role]);

  // Socket connection and handlers
  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    const socket = io("https://moy-bank.onrender.com", {
      auth: { token },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinSupportRoom");
    });

    socket.on("chatMessage", (msg: Message) => {
      if (msg.userId === selectedUserId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("error", (msg: string) => toast.error(msg));

    return () => {
      socket.disconnect();
    };
  }, [token, user?.role, selectedUserId]);

  const loadMessages = async (userId: string) => {
    setSelectedUserId(userId);
    try {
      const res = await axios.get(`https://moy-bank.onrender.com/api/support/history/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load messages");
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      text: newMessage,
      from: "Admin",
      userId: selectedUserId,
      fromSupport: true,
    };
    socketRef.current?.emit("chatMessage", msg);
    setMessages((prev) => [...prev, { ...msg, fromId: user?.id }]);
    setNewMessage("");
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 h-[90vh] ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      {/* Sidebar user list */}
      <div className="border-r border-gray-300 dark:border-gray-700 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">📬 Support Inbox</h2>
        <ul className="space-y-3">
          {userList.map((u) => (
            <li
              key={u.userId}
              className={`cursor-pointer p-2 rounded-xl ${selectedUserId === u.userId ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              onClick={() => loadMessages(u.userId)}
            >
              <p className="font-medium">User ID: {u.userId.slice(0, 6)}...</p>
              <p className="text-sm truncate">{u.lastMessage}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div className="col-span-3 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-md px-4 py-2 rounded-2xl ${
                msg.fromSupport ? "bg-primary text-white ml-auto" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {selectedUserId && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="px-5 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
