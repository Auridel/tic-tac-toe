const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require('uuid');

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
        const userList = Array.from(db.get(room).get("users").values());
        if(userList.find(item => item === userName)) io.to(socket.id).emit("USER_EXISTS");
        else if(userList.length === 2) io.to(socket.id).emit("ROOM_FULL");
        else {
            db.get(room).get("users").set(socket.id, userName);
            socket.join(room);
            const users = Array.from(db.get(room).get("users").values());
            io.to(room).emit("USER_JOINED", users);
            io.to(socket.id).emit("SET_USER_DATA", {userName, room});
        }
    })

    socket.on("ADD_MESSAGE", ({msg, room}) => {
        const user = Object.fromEntries(db.get(room).get("users"))[socket.id];
        const newMsg = {
            user: user,
            msg: msg,
            id: uuidv4()
        }
        db.get(room).get("messages").push(newMsg);
        io.to(room).emit("NEW_MESSAGE", newMsg);
    })

    socket.on("disconnect", () => {
        db.forEach((item, key) => {
            if(item.get("users").delete(socket.id)){
                const users = Array.from(db.get(key).get("users").values());
                socket.to(key).broadcast.emit("USER_LEFT", users);
            }
        })
    })
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, err => {
    if(err) throw new Error(err);
    else console.log(`Server is running on port ${PORT}...`)
})