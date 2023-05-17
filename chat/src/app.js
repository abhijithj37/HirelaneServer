const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const chat = require("../src/api/chat");
const socket = require("socket.io");
const PORT=process.env.PORT

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

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("a user connected");
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
    console.log("user disconnected");

    const userId = Array.from(global.onlineUsers.entries())
    .find(([key, value]) => value === socket.id)?.[0];
  if (userId){
    global.onlineUsers.delete(userId);
    const onlineUserIds = Array.from(global.onlineUsers.keys());
    io.emit("onlineUsers", onlineUserIds);
  }
  });


});
