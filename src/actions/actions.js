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





const SET_SIDE = (side) => {
    return {
        type: "SET_SIDE",
        payload: side
    }
}

const YOUR_MOVE = () => {
    return {
        type: "YOUR_MOVE"
    }
}


export {
    SET_USER_DATA,
    SET_USERS,
    UPDATE_MESSAGES,

    SET_SIDE,
    YOUR_MOVE
}