import React from "react";
import {connect} from "react-redux";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import {YOUR_MOVE} from "../../actions/actions";
import socket from "../../socket";

import "./board.scss";

const Board = ({active, side, moves, userName, room, isStopped}) => {
    const dispatch = useDispatch();


    return (
        <div className="board">
            {moves.map((item, i) =>
                <div
                    onClick={() => {
                        if(active && !moves[i] && !isStopped) {
                            dispatch(YOUR_MOVE(false));
                            const obj = {move: i, room: room}
                            socket.emit("USER_MOVE", obj);
                        }
                    }}
                    key={i}
                    className={classNames({
                    "cell": true,
                    "active-o": active && !isStopped && side === "o-sym",
                    "active-x": active && !isStopped && side === "x-sym",
                    "o-sym": item && ((side === "o-sym" && userName === item) || (side === "x-sym" && userName !== item)),
                    "x-sym": item && ((side === "x-sym" && userName === item) || (side === "o-sym" && userName !== item))
                })}/>)}
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        room: state.userData.room,
        userName: state.userData.userName,
        active: state.game.active,
        side: state.game.side,
        moves: state.game.moves,
        isStopped: state.game.isStopped
    }
}

export default connect(mapStateToProps)(Board);