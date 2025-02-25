import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState(null);
  const [onlineusers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);
  const {
    user: { username },
  } = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000");
      setSocket(socketRef.current);

      socketRef.current.on("connect", () => {
        socketRef.current.emit("register", {
          username: username,
          userId: socketRef.current.id,
        });
        socketRef.current.on("onlineUsers", function (online) {
          setOnlineUsers(online);
        });
      });
      socketRef.current.on("disconnect", () => {
        g("Disconnected from server");
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [username]);

  return { socket, onlineusers };
}

export default useSocket;
