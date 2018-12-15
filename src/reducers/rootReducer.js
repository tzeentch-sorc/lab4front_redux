import {combineReducers} from "redux";
import pointsReducer from "./pointsReducer";
import loginReducer from './loginReducer'


export default combineReducers({
    pointsReducer,
    loginReducer
});