import { COUNTUP, COUNTDOWN } from '../actionTypes/counterActionTypes.js';

const counterInitialState = {
    count: 10
};

export const counterReducer = (state = counterInitialState, action) => {
    switch (action.type) {
        case COUNTUP:
            return {
                ...state,
                count: state.count + 1
            };

        case COUNTDOWN:
            return {
                ...state,
                count: state.count - 1
            };
            
        default:
            return {
                ...state,
            };
    }
};