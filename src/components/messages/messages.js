import React, {useEffect, useRef} from "react";
import {connect} from "react-redux";
import socket from "../../socket";
import {UPDATE_MESSAGES} from "../../actions/actions";

import "./messages.scss";

const Messages = ({messages, UPDATE_MESSAGES, userName}) => {
    const messagesContainerRef = useRef();

    useEffect(() => {
        socket.on("NEW_MESSAGE", updateMessages)
    }, [])

    const updateMessages = (msg) => {
        UPDATE_MESSAGES(msg);
        messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
    }

    return (
        <div ref={messagesContainerRef} className="chat__messages-container">
            <ul className="chat__messages-list">
                {messages.map(item =>
                    <li key={item.id}
                        className={`chat__message${item.user === userName ? " yours" : ""}`}>{item.msg}<span className="chat__message-user">{item.user}</span></li>
                )}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        messages: state.userData.messages,
        userName: state.userData.userName
    }
}
const mapDispatchToProps = {
    UPDATE_MESSAGES
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);