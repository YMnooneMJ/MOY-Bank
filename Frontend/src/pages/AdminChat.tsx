import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const socket: Socket = io("https://moy-bank.onrender.com");

const AdminChat = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId || !user) return;

    socket.emit("joinRoom", userId);

    socket.on("chatMessage", (msg) => {
      if (msg.userId === userId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    const fetchMessages = async () => {
      const res = await axios.get(`/api/chat/user/${userId}`);
      setMessages(res.data);
    };

    fetchMessages();

    return () => {
      socket.off("chatMessage");
    };
  }, [userId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msg = {
      from: user.fullName,
      fromId: user._id,
      text: message,
      fromSupport: true,
      userId, // target user ID
    };
    socket.emit("chatMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with User</h2>

      <div className="h-[400px] overflow-y-auto bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.fromSupport
                ? "bg-green-100 dark:bg-green-700 text-right"
                : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {msg.fromSupport ? "Admin" : msg.from}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
