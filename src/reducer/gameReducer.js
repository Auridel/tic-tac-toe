const initialState = {
    isStarted: false,
    isStopped: false,
    side: "",
    moves: [...Array(9)],
    active: false,
    timer: 0
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SIDE": {
            return {
                ...state,
                isStarted: true,
                side: action.payload
            }
        }
        case "SET_TIMER": {
            return {
                ...state,
                timer: action.payload
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
        default: return state;
    }
}

export default gameReducer;