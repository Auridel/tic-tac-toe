const initialState = {
    userName: "",
    room: "",
    users: [],
    messages: []
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_DATA": {
            const {userName, room} = action.payload;
            return {
                ...state,
                userName: userName,
                room: room
            }
        }
        case "SET_USERS": {
            return {
                ...state,
                users: [...action.payload]
            }
        }
        case "UPDATE_MESSAGES": {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
        default: return state;
    }
};

export default dataReducer;