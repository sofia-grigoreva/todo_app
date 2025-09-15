import { createStore, applyMiddleware } from '../lib/redux.js';
import { reducer } from './reducers/index.js';
import { Middleware } from './middlewares/index.js';

const createStoreWithMiddleware = applyMiddleware(Middleware)(createStore);
export const store = createStoreWithMiddleware(reducer);


