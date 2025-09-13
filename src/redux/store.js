import { createStore } from '../lib/redux.js';
import { todoReducer } from '../redux/reducers.js';

export const store = createStore(todoReducer);

