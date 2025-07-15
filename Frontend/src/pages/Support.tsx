import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const Support = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null); // ✅ move inside component

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    socketRef.current = io("https://moy-bank.onrender.com/api/support/inbox", {
      auth: {
        token,
      },
    });

    const socket = socketRef.current;

    socket.emit("joinRoom", user._id);

    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!socketRef.current || message.trim() === "") return;

    const msg = {
      from: user.fullName,
      fromId: user._id,
      text: message,
      fromSupport: false,
    };

    socketRef.current.emit("chatMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Support Chat</h2>

      <div className="h-[400px] overflow-y-auto bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.from === user.fullName
                ? "bg-blue-100 dark:bg-blue-700 text-right"
                : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {msg.from === user.fullName ? "You" : msg.from}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Support;
