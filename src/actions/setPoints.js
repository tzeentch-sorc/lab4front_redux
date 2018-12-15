export const SET_POINTS = 'SET_POINTS';

export function setPoints(pointsData) {
    return{
        type: SET_POINTS,
        points: pointsData
    }
}