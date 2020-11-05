const initialState = {
    isStarted: false,
    isStopped: false,
    side: "",
    moves: [...Array(9)],
    active: false,
    timer: null
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
        case "YOUR_MOVE": {
            return {
                ...state,
                active: true
            }
        }
        default: return state;
    }
}

export default gameReducer;