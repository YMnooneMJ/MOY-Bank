// SupportChat.tsx
import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const SOCKET_URL = "https://moy-bank.onrender.com";

interface Message {
  _id?: string;
  text: string;
  from: string;
  fromSupport: boolean;
  createdAt?: string;
}

const SupportChat = () => {
  const { user, token } = useAuth();
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!token || !user) return;

    const socket = io(SOCKET_URL, {
      auth: { token },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinRoom");
    });

    socket.on("chatMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("error", (err) => {
      toast.error(err);
    });

    return () => {
      socket.disconnect();
    };
  }, [token, user]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      text: newMessage,
      from: user?.fullName || "User",
      fromSupport: false,
    };
    socketRef.current?.emit("chatMessage", msg);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 border rounded-xl shadow-lg h-[500px] flex flex-col overflow-hidden ${
        isDarkMode ? "bg-[#0f172a] border-gray-700 text-white" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-4 text-center font-semibold border-b dark:border-gray-700">
        💬 Support Chat
      </div>
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-3 py-2 rounded-xl ${
              msg.fromSupport
                ? isDarkMode
                  ? "bg-gray-700 self-start"
                  : "bg-gray-200 self-start"
                : "bg-primary text-white self-end"
            }`}
          >
            <p className="text-sm whitespace-pre-line">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t dark:border-gray-700 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`flex-1 px-4 py-2 rounded-xl outline-none border ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SupportChat;
