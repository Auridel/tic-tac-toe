const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());

const db = new Map();

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("ROOM_JOIN", ({room, userName, privacy = false}) => {
        if(!db.has(room))
            db.set(room,
                new Map([
                    ["users", new Map()],
                    ["messages", []],
                    ["privacy", {isPrivate: privacy}]
                ])
            );
        console.log(db.get(room).get("privacy"))
        const userList = Array.from(db.get(room).get("users").values());
        if(userList.find(item => item === userName)) io.to(socket.id).emit("USER_EXISTS");
        else if(userList.length === 2) io.to(socket.id).emit("ROOM_FULL");
        else {
            db.get(room).get("users").set(socket.id, userName);
            socket.join(room);
            io.to(socket.id).emit("SET_USERNAME", userName);
            const users = Array.from(db.get(room).get("users").values());
            io.to(room).emit("USER_JOINED", users);
        }
    })
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, err => {
    if(err) throw new Error(err);
    else console.log(`Server is running on port ${PORT}...`)
})