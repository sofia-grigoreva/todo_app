import TodoItem from '../components/todoItem/todoItem.js';
import { generateUUID } from '../helpers/idHelper.js';
import { ADDTODO, DELETETODO, EDITTODO } from '../redux/actionTypes.js';

const initialState = {
    todos: [],
};

export const todoReducer = (state = initialState, action) => {
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
