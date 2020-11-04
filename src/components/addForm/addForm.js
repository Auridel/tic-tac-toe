import React, {useState} from "react";
import socket from "../../socket";
import {connect} from "react-redux";

import "./addForm.scss";

const AddForm = ({room}) => {
    const [msg, setMsg] = useState("");

    return (
        <div className="add-form">
            <textarea
                onChange={(e) => {
                    setMsg(e.target.value)
                }}
                value={msg}
                className="add-form__input"/>
            <button
                onClick={() => {
                    const obj = {msg, room};
                    if(msg.trim()) socket.emit("ADD_MESSAGE", obj);
                    setMsg("");
                }}
                className="add-form__btn">Send</button>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        room: state.room
    }
}

export default connect(mapStateToProps)(AddForm);