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

const SET_TIMER = (timer) => {
    return {
        type: "SET_TIMER",
        payload: timer
    }
}

const YOUR_MOVE = (bool) => {
    return {
        type: "YOUR_MOVE",
        payload: bool
    }
}

const UPDATE_MOVES = (moves) => {
    return {
        type: "UPDATE_MOVES",
        payload: moves
    }
}


export {
    SET_USER_DATA,
    SET_USERS,
    UPDATE_MESSAGES,

    SET_SIDE,
    SET_TIMER,
    YOUR_MOVE,
    UPDATE_MOVES
}