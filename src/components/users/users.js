import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useDispatch} from "react-redux";
import socket from "../../socket";
import {SET_SIDE, YOUR_MOVE} from "../../actions/actions";

import "./users.scss";

const Users = ({users, room, userName, isStarted}) => {
    const [full, setFull] = useState(false);
    const [ready, setReady] = useState(false);
    const [active, setActive] = useState(null);
    const dispatch = useDispatch();



    useEffect(() => {
        socket.on("GAME_STARTED", onStart);
        socket.on("MAKE_MOVE", onMove)


    }, [])



    const onStart = () => {
        const idx = users.findIndex(item => item === userName);
        if(idx === 0) dispatch(SET_SIDE("x-sym"));
        else dispatch(SET_SIDE("o-sym"));
    }

    const onMove = ({user}) => {
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
        isStopped: state.game.isStopped
    }
}

export default connect(mapStateToProps)(Users);