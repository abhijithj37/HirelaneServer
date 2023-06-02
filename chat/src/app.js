const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const chat = require("../src/api/chat");
const socket = require("socket.io");
const PORT = process.env.PORT;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", chat);

const server = app.listen(PORT, (res) => {
  console.log(`Chat server running in the port ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// ******************************************************************************Chat*********************************************************************************************************

global.onlineUsers = new Map();
const userToSocketIdMap = new Map();
const socketIdToUserMap = new Map();

io.on("connection", (socket) => {
  socket.on("addUser", (id) => {
    global.onlineUsers.set(id, socket.id);

    const onlineUserIds = Array.from(global.onlineUsers.keys());
    io.emit("onlineUsers", onlineUserIds);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data);
    }
  });

  socket.on("disconnect", () => {
    const userId = Array.from(global.onlineUsers.entries()).find(
      ([key, value]) => value === socket.id
    )?.[0];
    if (userId) {
      global.onlineUsers.delete(userId);
      const onlineUserIds = Array.from(global.onlineUsers.keys());
      io.emit("onlineUsers", onlineUserIds);
    }
  });

  socket.on("removeFromOnline", (id) => {
    const userId = id;
    if (userId) {
      global.onlineUsers.delete(userId);
      const onlineUserIds = Array.from(global.onlineUsers.keys());
      io.emit("onlineUsers", onlineUserIds);
    }
  });

  // ************************************************************************************************************************************************************

  // *******************************************************************VideoChat********************************************************************************

  socket.on("join:meet", (data) => {
    const { user, meet } = data;

    userToSocketIdMap.set(user, socket.id);
    socketIdToUserMap.set(socket.id, user);

    io.to(meet).emit("user:joined", { user, id: socket.id });
    socket.join(meet);
    io.to(socket.id).emit("join:meet", data);
  });

  socket.on("user:call", ({ to, offer, userData }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer, userData });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("chat:message", (message) => {
    socket.broadcast.emit("chat:message", message);
  });

  //****************************************************************************************************************************************************************** */
});
