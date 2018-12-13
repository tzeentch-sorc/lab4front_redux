import {combineReducers} from "redux";
import points from "./points";
import loginReducer from './loginReducer'


export default combineReducers({
    points,
    loginReducer
});