import React from "react";
import {connect} from "react-redux";

import "./users.scss";

const Users = ({users}) => {

    const showUsers = (arr) => {
        if(arr.length > 1){
            return arr.map(el => <div key={el} className="user">{el}</div>)
        }
        else return (
            <>
                <div className="user active">{arr[0]}</div>
                <div className="user">Waiting...</div>
            </>
        )
    }

    return (
        <aside className="users">
            {showUsers(users)}
            <div className="timer">0:20</div>
        </aside>
    )
};

const mapStateToProps = (state) => {
    return {
        users: state.userData.users
    }
}

export default connect(mapStateToProps)(Users);