const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
http = require("http");
const connectDB = require("./utils/db");
const { Server } = require("socket.io");
const { setSocketIO } = require("./controllers/chat/chat.controller.js");
const urlFrontend = require("./utils/baseUrl");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts.routes.js");
const authRouter = require("./routes/api/users.routes");
const chatRouter = require("./routes/api/chat.routes");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: urlFrontend,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: urlFrontend,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

setSocketIO(io);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
