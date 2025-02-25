import { Server } from "socket.io";

function socket(server) {
  const online = new Map();
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for the "register" event
    socket.on("register", function (obj) {
      // Add the user to the online Map
      online.set(obj.username, obj.userId);

      // Convert the Map to an object and emit it
      const onlineUsersObject = Object.fromEntries(online);
      io.emit("onlineUsers", onlineUsersObject);
      console.log(onlineUsersObject, "asd"); // This will now log the updated object
    });

    // Listen for the "message" event
    socket.on("message", function (data) {
      const [key, value] = Array.from(online)
        ?.filter(([key, value]) => key == data.user)
        .flat();
      socket.to(value).emit("MessageReciver", { data: data.inputValue });
      console.log(data);
    });

    // Listen for the "disconnect" event
    socket.on("disconnect", () => {
      online.forEach((value, key) => {
        if (value === socket.id) {
          online.delete(key);
          console.log(`User ${key} disconnected`);

          // Emit the updated online users list after a user disconnects
          const onlineUsersObject = Object.fromEntries(online);
          io.emit("onlineUsers", onlineUsersObject);
        }
      });
    });
  });

  return io; // Return the instance in case we need it elsewhere
}

export default socket;
