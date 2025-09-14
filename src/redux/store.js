import { createStore, applyMiddleware } from '../lib/redux.js';
import { reducer } from '../redux/reducers.js';
import { todoColorMiddleware } from '../redux/middleware.js';

const createStoreWithMiddleware = applyMiddleware(todoColorMiddleware)(createStore);
export const store = createStoreWithMiddleware(reducer);


