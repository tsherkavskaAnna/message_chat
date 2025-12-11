const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
http = require('http');  
const connectDB = require('./utils/db')
const { Server } = require("socket.io");

require('dotenv').config(); 

const contactsRouter = require("./routes/api/contcts.routes");
const authRouter = require("./routes/api/users.routes");
const chatRouter = require("./routes/api/chat.routes")

const PORT = process.env.PORT || 8080; ;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

const server = http.createServer(app);
const io = new Server(server, {
      cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"], 
            credentials: true
      }
});

io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
            console.log('user disconnected');
      });
});

app.get('/', (req, res) => {
      res.send('Hello World!')
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
});


server.listen((PORT), () => {
      console.log(`🚀 Server running on port ${PORT}`);
      connectDB();
})


