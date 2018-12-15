import {SET_POINTS} from "../actions/setPoints";

export default function pointsReducer(state = [], action = {}) {
    switch (action.type) {
        case SET_POINTS:
            return {
              points: action.points
            };
        default: return state;
    }
}