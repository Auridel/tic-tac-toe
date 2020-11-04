const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());

io.on("connection", (socket) => {
    console.log("connected");
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, err => {
    if(err) throw new Error(err);
    else console.log(`Server is running on port ${PORT}...`)
})