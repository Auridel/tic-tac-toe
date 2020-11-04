import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {SET_USERS, SET_USERNAME} from "../../actions/actions";
import Login from "../login/login";
import Board from "../board/board";
import Users from "../users/users";
import socket from "../../socket";
// import Chat from "../chat/chat";

import "./app.scss"


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("USER_JOINED", onJoin);
    }, [])
    const onJoin = (users) => {
        dispatch(SET_USERS(users));
    }

    return (
        <main className="main__container">
            <h1 className="main__header">Welcome to Tic-Tac-Toe!</h1>
            <p className="main__desc">Enter the room to start</p>
            <Login/>
            <div className="wrapper">
                <Users/>
                <Board/>
                {/*<Chat/>*/}
            </div>
        </main>
    )
};

export default App;