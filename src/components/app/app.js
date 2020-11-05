import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {connect} from "react-redux";
import {SET_USERS, SET_USER_DATA} from "../../actions/actions";
import Login from "../login/login";
import Board from "../board/board";
import Users from "../users/users";
import socket from "../../socket";
import Chat from "../chat/chat";

import "./app.scss"


const App = ({room}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("USER_JOINED", setUsers);
        socket.on("SET_USER_DATA", onUserData);
        socket.on("USER_LEFT", setUsers);
    }, [])
    const setUsers = (users) => {
        console.log(users)
        dispatch(SET_USERS(users));
    }
    const onUserData = ({userName, room}) => {
        dispatch(SET_USER_DATA(userName, room));
    }

    return (
        <main className="main__container">
            <h1 className="main__header">Welcome to Tic-Tac-Toe!</h1>
            <p className="main__desc">Enter the room to start</p>
            {!room? <Login/>
                :
            <div className="wrapper">
                <Users/>
                <Board/>
                <Chat/>
            </div>}
        </main>
    )
};


const mapStateToProps = (state) => {
    return {
        room: state.userData.room
    }
}

export default connect(mapStateToProps)(App);