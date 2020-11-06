const initialState = {
    isStarted: false,
    isStopped: false,
    side: "",
    moves: [...Array(9)],
    active: false,
    message: ""
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SIDE": {
            return {
                ...state,
                isStarted: true,
                side: action.payload,
                message: "Game started!"
            }
        }
        case "YOUR_MOVE": {
            return {
                ...state,
                active: action.payload
            }
        }
        case "UPDATE_MOVES": {
            return {
                ...state,
                moves: [...action.payload]
            }
        }
        case "GAME_OVER": {
            return {
                ...state,
                isStopped: true,
                message: action.payload,
                timer: 0
            }
        }
        default: return state;
    }
}

export default gameReducer;