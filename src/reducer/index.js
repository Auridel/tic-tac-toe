import {combineReducers} from "redux";
import dataReducer from "./dataReducer";
import gameReducer from "./gameReducer";

const reducer = combineReducers({userData: dataReducer, game: gameReducer});

export default reducer;