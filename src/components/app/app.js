import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {connect} from "react-redux";
import {SET_USERS, SET_USER_DATA, UPDATE_MOVES, GAME_OVER} from "../../actions/actions";
import Login from "../login/login";
import Board from "../board/board";
import Users from "../users/users";
import socket from "../../socket";
import Chat from "../chat/chat";

import "./app.scss"


const App = ({room, message}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("USER_JOINED", setUsers);
        socket.on("SET_USER_DATA", onUserData);
        socket.on("USER_LEFT", setUsers);
        socket.on("NEW_MOVE", onNewMove);
        socket.on("GAME_OVER", onGameOver);

    }, [])
    const setUsers = (users) => {
        dispatch(SET_USERS(users));
    }
    const onUserData = ({userName, room}) => {
        dispatch(SET_USER_DATA(userName, room));
    }
    const onNewMove = (moves) => {
        dispatch(UPDATE_MOVES(moves));
    }
    const onGameOver = (res) => {
        if(res.reason === "win") dispatch(GAME_OVER(`User ${res.winner} win!`));
        else if(res.reason === "draw") dispatch(GAME_OVER("It's a draw!"));
        else if(res.reason === "left") dispatch(GAME_OVER("User left the room!"));
    }



    return (
        <main className="main__container">
            <h1 className="main__header">Welcome to Tic-Tac-Toe!</h1>
            {!room?
                <>
                    <p className="main__desc">Enter the room to start</p>
                    <Login/>
                </>
                :
                <>
                    <span className="status">{message? message : "Waiting fo users..."}</span>
                    <div className="wrapper">

                        <Users/>
                        <Board/>
                        <Chat/>
                    </div>
                </>}
        </main>
    )
};


const mapStateToProps = (state) => {
    return {
        room: state.userData.room,
        message: state.game.message
    }
}

export default connect(mapStateToProps)(App);