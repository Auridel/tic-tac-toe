const SET_USER_DATA = (userName, room) => {
    return {
        type: "SET_USER_DATA",
        payload: {userName, room}
    }
}

const SET_USERS = (users) => {
    return {
        type: "SET_USERS",
        payload: users
    }
}

const UPDATE_MESSAGES = (messages) => {
    return {
        type: "UPDATE_MESSAGES",
        payload: messages
    }
}


export {
    SET_USER_DATA,
    SET_USERS,
    UPDATE_MESSAGES
}