import React from "react";
import Login from "../login/login";
import Board from "../board/board";
import Users from "../users/users";
// import Chat from "../chat/chat";

import "./app.scss"


const App = () => {
    return (
        <main className="main__container">
            <h1 className="main__header">Welcome to Tic-Tac-Toe!</h1>
            <p className="main__desc">Enter the room to start</p>
            {/*<Login/>*/}
            <div className="wrapper">
                <Users/>
                <Board/>
                {/*<Chat/>*/}
            </div>
        </main>
    )
};

export default App;