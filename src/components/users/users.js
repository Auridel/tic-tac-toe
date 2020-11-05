import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useDispatch} from "react-redux";
import socket from "../../socket";

import "./users.scss";
import {SET_SIDE} from "../../actions/actions";

const Users = ({users, room, userName, isStarted}) => {
    const [full, setFull] = useState(false);
    const [ready, setReady] = useState(false);
    const [active, setActive] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const dispatch = useDispatch();



    useEffect(() => {
        socket.on("GAME_STARTED", onStart);
        socket.on("MAKE_MOVE", onMove)
    }, [])

    const calcTime = (time) => {
        let left = Math.floor(time - Date.now()/1000);
        if(left < 10) return "0" + left;
        else return left;
    }

    const onStart = () => {
        const idx = users.findIndex(item => item === userName);
        if(idx === 0) dispatch(SET_SIDE("x-sym"));
        else dispatch(SET_SIDE("o-sym"));
    }
    const onMove = ({user, timer}) => {
        setActive(user);
        setCountdown(calcTime(timer));
        const timerHandler = setInterval(() => {
            if(calcTime(timer) <= 0) {
                clearInterval(timerHandler);
                setCountdown(null);
            }
            else setCountdown(calcTime(timer));
        }, 1000)
    }




    useEffect(() => {
        if(!full && users.length === 2) setFull(true);
    }, [users])

    const showUsers = (arr) => {
        if(arr.length > 1){
            return arr.map(el => <div key={el} className={active === el? "user active" : "user"}>{el}</div>)
        }
        else return (
            <>
                <div className="user">{arr[0]}</div>
                <div className="user">Waiting...</div>
            </>
        )
    }

    return (
        <aside className="users">
            {showUsers(users)}
            <div className="timer">{countdown? `0:${countdown}` : "-:--"}</div>
            {!isStarted && <button
                onClick={() => {
                    setReady(true);
                    socket.emit("USER_READY", {room})
                }}
                className={ready? "ready-btn ready" : "ready-btn"}>Ready</button>}
        </aside>
    )
};

const mapStateToProps = (state) => {
    return {
        users: state.userData.users,
        room: state.userData.room,
        userName: state.userData.userName,
        isStarted: state.game.isStarted
    }
}

export default connect(mapStateToProps)(Users);