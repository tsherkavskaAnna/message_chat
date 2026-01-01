const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
http = require("http");
const connectDB = require("./utils/db");
const urlFrontend = require("./utils/baseUrl");
const { initSocket } = require("./utils/socket");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts.routes.js");
const authRouter = require("./routes/api/users.routes");
const chatRouter = require("./routes/api/chat.routes");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: process.env.URL_FRONDEND,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/chat", chatRouter);

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

const server = http.createServer(app);
const io = initSocket(server, urlFrontend);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
