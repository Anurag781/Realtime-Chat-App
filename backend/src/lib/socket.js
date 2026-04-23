import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// used to store online users
// { userId: [socketId1, socketId2] }

const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    // if user not exists create array
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = [];
    }

    // add socket id
    userSocketMap[userId].push(socket.id);
  }

  // send online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", ({ to, from }) => {
    const receiverSockets = userSocketMap[to];

    if (receiverSockets) {
      receiverSockets.forEach((socketId) => {
        io.to(socketId).emit("userTyping", { from });
      });
    }
  });

  socket.on("stopTyping", ({ to, from }) => {
    const receiverSockets = userSocketMap[to];

    if (receiverSockets) {
      receiverSockets.forEach((socketId) => {
        io.to(socketId).emit("userStopTyping", { from });
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    if (userId && userSocketMap[userId]) {
      // remove disconnected socket
      userSocketMap[userId] = userSocketMap[userId].filter(
        (id) => id !== socket.id
      );

      // if no tabs/devices open remove user
      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };