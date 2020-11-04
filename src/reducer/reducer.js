const initialState = {
    userName: "",
    room: "",
    users: [],
    messages: [],
    moves: [],
    active: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERNAME": {
            return {
                ...state,
                userName: action.payload
            }
        }
        case "SET_USERS": {
            return {
                ...state,
                users: [...action.payload]
            }
        }
        default: return state;
    }
};

export default reducer;