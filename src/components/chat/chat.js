import React from "react";
import Messages from "../messages/messages";
import AddForm from "../addForm/addForm";

import "./chat.scss";

const Chat = () => {
    return (
        <div className="chat__wrapper">
            <Messages/>
            <AddForm/>
        </div>
    )
};

export default Chat;