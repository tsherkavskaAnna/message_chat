const { Server } = require("socket.io");

let io;

const initSocket = (server, urlFrontend) => {
  io = new Server(server, {
    cors: {
      origin: urlFrontend,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // entrare in una stanza per la chat
    socket.on("join_room", (chatId) => {
      socket.join(chatId.toString());
    });

    // invio messaggio solo nella stanza della chat
    socket.on("send_message", ({ chatId, message }) => {
      io.to(chatId).emit("receive_message", message);
    });

    // uscire dalla stanza della chat
    socket.on("leave_room", (chatId) => {
      socket.leave(chatId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  io.on("error", (error) => {
    console.error("Socket.io error:", error);
  });

  return io;
};

module.exports = {
  initSocket,
  getIO: () => io,
};
