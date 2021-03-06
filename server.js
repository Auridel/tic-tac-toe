const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require('uuid');
const {checkWin} = require("./utils");

app.use(express.json());

const db = new Map();
class DefaultGame  {
    isStarted = false;
    isStopped = false;
        isReady= {};
        queue = [];
        moves = [...Array(9)]
}
const availableRooms  = [];

io.on("connection", (socket) => {
    console.log("connected");
    io.to(socket.id).emit("ROOMS", availableRooms);
    socket.on("ROOM_JOIN", ({room, userName}) => {
        if(!db.has(room)) {
            db.set(room,
                new Map([
                    ["users", new Map()],
                    ["messages", []],
                    ["game", new DefaultGame()]
                ])
            );
            availableRooms.push(room);
        }
        const userList = Array.from(db.get(room).get("users").values());
        if(userList.find(item => item === userName)) io.to(socket.id).emit("USER_EXISTS");
        else if(userList.length === 2) io.to(socket.id).emit("ROOM_FULL");
        else {
            if(userList.length === 1) {
                const idx = availableRooms.findIndex(item => item === room);
                availableRooms.splice(idx, 1);
            }

            db.get(room).get("users").set(socket.id, userName);
            db.get(room).get("game").isReady[socket.id] = false;
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


    socket.on("USER_READY", ({room}) => {
        db.get(room).get("game").isReady[socket.id] = true;
        const game = db.get(room).get("game");
        let readyCount = 0;
        for(let key in game.isReady){
            if(game.isReady[key] === true) readyCount++;
        }

        if(readyCount === 2 && !game.isStarted && !game.isStopped) {
            db.get(room).get("game").isStarted = true;
            io.to(room).emit("GAME_STARTED");

            const users = Array.from(db.get(room).get("users").values());
            io.to(room).emit("MAKE_MOVE", {user: users[Math.floor(Math.random()*2)]});
        }
    })

    socket.on("USER_MOVE", ({move, room}) => {
        const users = Object.fromEntries(db.get(room).get("users"));

        db.get(room).get("game").queue.push(socket.id);
        db.get(room).get("game").moves[move] = users[socket.id];
        io.to(room).emit("NEW_MOVE", db.get(room).get("game").moves);

        const winner = checkWin(db.get(room).get("game").moves);
        if(winner) {
            db.get(room).get("game").isStopped = true;
            io.to(room).emit("GAME_OVER", {reason: "win", winner});
        }
        else {
            if(db.get(room).get("game").queue.length === 9) {
                db.get(room).get("game").isStopped = true;
                io.to(room).emit("GAME_OVER", {reason: "draw"});
            }
            else if(!db.get(room).get("game").isStopped){
                const nextUser = Object.keys(users).filter(item => item !== socket.id)[0];
                io.to(room).emit("MAKE_MOVE", {user: users[nextUser]});
            }
        }
    })

    socket.on("RESTART", ({room}) => {
        const users = Array.from(db.get(room).get("users").keys());
        db.get(room).set("game", new DefaultGame());
        users.forEach(item => {
            db.get(room).get("game").isReady[item] = false;
        })
        io.to(room).emit("GAME_RESTARTED");
    })

    socket.on("disconnect", () => {
        db.forEach((item, key) => {
            if(item.get("users").delete(socket.id)){
                const users = Array.from(db.get(key).get("users").values());
                socket.to(key).broadcast.emit("USER_LEFT", users);
                if(!users.length) {
                    const idx = availableRooms.findIndex(item => item === key);
                    availableRooms.splice(idx, 1);
                    db.delete(key);
                }
                else {
                    if(db.get(key).get("game").isStarted && !db.get(key).get("game").isStopped){
                        db.get(key).get("game").isStopped = true;
                        io.to(key).emit("GAME_OVER", {reason: "left"});
                    }
                    else {
                        availableRooms.push(key);
                    }
                }
            }
        })
    })
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, err => {
    if(err) throw new Error(err);
    else console.log(`Server is running on port ${PORT}...`)
})