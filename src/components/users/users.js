import React from "react";

import "./users.scss";

const Users = () => {
    return (
        <aside className="users">
            <div className="user active">User 1</div>
            <div className="user">User 2</div>
            <div className="timer">0:20</div>
        </aside>
    )
};

export default Users;