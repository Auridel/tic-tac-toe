import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useDispatch} from "react-redux";
import socket from "../../socket";
import {SET_SIDE, YOUR_MOVE, SET_TIMER} from "../../actions/actions";

import "./users.scss";

const Users = ({users, room, userName, isStarted, timer}) => {
    const [full, setFull] = useState(false);
    const [ready, setReady] = useState(false);
    const [active, setActive] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const dispatch = useDispatch();



    useEffect(() => {
        socket.on("GAME_STARTED", onStart);
        socket.on("MAKE_MOVE", onMove)


    }, [])

    useEffect(() => {
        const timerHandler = setInterval(() => {
            if(calcTime() <= 0) {
                clearInterval(timerHandler);
            }
            else setCountdown(calcTime());
        }, 1000)

        return () => {
            clearInterval(timerHandler);
        }
    },  [timer])


    const calcTime = () => {
        let left = Math.floor(timer - Date.now()/1000);
        if(left < 10 && left >= 0) return "0" + left;
        else return left;
    }

    const onStart = () => {
        const idx = users.findIndex(item => item === userName);
        if(idx === 0) dispatch(SET_SIDE("x-sym"));
        else dispatch(SET_SIDE("o-sym"));
    }

    const onMove = ({user, timer}) => {
        dispatch(SET_TIMER(timer));
        if(user === userName) dispatch(YOUR_MOVE(true));
        else dispatch(YOUR_MOVE(false));

        setActive(user);
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
            <div className="timer">{countdown > 0? `0:${countdown}` : "-:--"}</div>
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
        isStarted: state.game.isStarted,
        timer: state.game.timer
    }
}

export default connect(mapStateToProps)(Users);