import React from "react";

import "./board.scss";

const Board = () => {
    return (
        <div className="board">
            <div className="cell o-sym"/>
            <div className="cell x-sym"/>
            <div className="cell"/>
            <div className="cell"/>
            <div className="cell"/>
            <div className="cell"/>
            <div className="cell"/>
            <div className="cell"/>
            <div className="cell"/>
        </div>
    )
};

export default Board;