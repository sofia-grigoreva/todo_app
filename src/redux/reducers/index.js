import { combineRedcuers } from '../../lib/redux.js';
import { counterReducer } from './counterReducer.js';
import { todoReducer } from './todoReducer.js';

export const reducer = combineRedcuers({ counter : counterReducer, todo : todoReducer });
