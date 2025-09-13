import { createStore } from '../lib/redux.js';
import { reducer } from '../redux/reducers.js';

export const store = createStore(reducer);


