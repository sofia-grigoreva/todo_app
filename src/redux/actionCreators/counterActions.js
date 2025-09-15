import { COUNTUP, COUNTDOWN }  from '../actionTypes/counterActionTypes.js';

export const countUp = (newCount) => ({
    type: COUNTUP
});

export const countDown = (newCount) => ({
    type: COUNTDOWN
});