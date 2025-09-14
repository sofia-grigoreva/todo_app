import { ADDTODO } from '../redux/actionTypes.js';
import { generateRandomColor } from '../helpers/colorHelper.js';

export const todoColorMiddleware = store => dispatch => action => {
  if (action.type === ADDTODO) {
    const color = generateRandomColor();
    const newAction = {
      ...action,
      payload: {
        ...action.payload,
        color
      }
    };
    return dispatch(newAction);
  }
  return dispatch(action);
};
