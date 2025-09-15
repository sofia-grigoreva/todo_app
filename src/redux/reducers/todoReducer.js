import { generateUUID } from '../../helpers/idHelper.js';
import { ADDTODO, DELETETODO, EDITTODO} from '../actionTypes/todoActionTypes.js';

const todoInitialState = {
    todos: []
};

export const todoReducer = (state = todoInitialState, action) => {
    switch (action.type) {
        case ADDTODO:
            const newItem = {
                id: generateUUID(),
                text: action.payload.text,
                isEditing: false,
                color: action.payload.color
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
                        return {
                            id: item.id,
                            text: action.payload.newText ? action.payload.newText : item.text,
                            isEditing: action.payload.isEditing,
                            color: action.payload.color
                        };
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
