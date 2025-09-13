import { combineRedcuers } from '../lib/redux.js';
import { generateUUID } from '../helpers/idHelper.js';
import { ADDTODO, DELETETODO, EDITTODO, COUNTUP, COUNTDOWN} from '../redux/actionTypes.js';

const todoInitialState = {
    todos: []
};

const todoReducer = (state = todoInitialState, action) => {
    switch (action.type) {
        case ADDTODO:
            const newItem = {
                id: generateUUID(),
                text: action.payload.text,
                isEditing: false,
                color: ''
            };
            return {
                ...state,
                todos: [
                    ...state.todos,
                    newItem
                ]
            };
        
        case DELETETODO:
            return {
                ...state,
                todos: state.todos.filter((item) => item.id !== action.payload.id)
            };

        case EDITTODO:
            return {
                ...state,
                todos: state.todos.map(item => {
                    if (item.id === action.payload.id) {
                        const updatedItem = {
                            id: item.id,
                            text: action.payload.newText ? action.payload.newText : item.text,
                            isEditing: action.payload.isEditing,
                            color: action.payload.color
                        };
                        return updatedItem;
                    }
                    return item;
                })
            };
            
        default:
            return {
                ...state,
            };
    }
};

const counterInitialState = {
    count: 10
};

const counterReducer = (state = counterInitialState, action) => {
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

export const reducer = combineRedcuers({ counter : counterReducer, todo : todoReducer });
