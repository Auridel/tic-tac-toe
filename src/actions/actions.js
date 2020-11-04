const SET_USERNAME = (username) => {
    return {
        type: "SET_USERNAME",
        payload: username
    }
}

const SET_USERS = (users) => {
    return {
        type: "SET_USERS",
        payload: users
    }
}


export {
    SET_USERNAME,
    SET_USERS
}