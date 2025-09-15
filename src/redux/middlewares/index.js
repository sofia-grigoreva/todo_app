import { ADDTODO } from '../actionTypes/todoActionTypes.js';
import { todoTransformer } from './todoTransformer.js';

export const Middleware = store => dispatch => action => {
  if (action.type === ADDTODO) {
    return dispatch(todoTransformer(action));
  }
  return dispatch(action);
};
