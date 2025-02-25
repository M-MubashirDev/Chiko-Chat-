import { IoPaperPlane } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MessageBox({ socket }) {
  const [inputValue, setInputValue] = useState("");
  const [searchParam] = useSearchParams();
  const [searchParams] = useSearchParams();
  const otheruser = searchParams.get("user");
  console.log(otheruser);
  const [messages, setMessages] = useState([]);
  const {
    user: { username: currentUser },
  } = JSON.parse(localStorage.getItem("auth")) || {};
  console.log(currentUser);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      const user = searchParam.get("user");
      const id = searchParam.get("id");

      // Emit the message or handle it as needed
      socket.emit("message", { user, id, inputValue });
      setMessages([
        ...messages,
        { sender: currentUser, text: inputValue, time: "5:00 PM" },
      ]);
      setInputValue(""); // Clear the input after submission
    }
  };
  useEffect(() => {
    socket?.on("MessageReciver", (data) => {
      console.log(data);
      setMessages([
        ...messages,
        { sender: otheruser, text: data.data, time: "5:00 PM" },
      ]);
    });
  }, [inputValue, messages, otheruser, socket]);

  // const messages = [
  //   { sender: "Alice", text: "Hey! How are you?", time: "10:30 AM" },
  // ];

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] overflow-y-auto w-full bg-gray-100">
      {/* Chat Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chat with Alice</h2>
        <button className="text-gray-400 hover:text-white">⋮</button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === currentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-300 block text-right mt-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white border-t flex items-center"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="p-2 pl-4">
          <IoPaperPlane size={24} />
        </button>
      </form>
    </div>
  );
}
