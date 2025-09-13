import TodoItem from '../components/todoItem/todoItem.js';
import { ADDTODO, DELETETODO, EDITTODO } from '../redux/actionTypes.js';

const initialState = {
    todos: [],
};

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDTODO:
            const newItemData = {
                id: Date.now(),
                text: action.payload.text,
            };
            const newItem = new TodoItem(action.payload.parent, newItemData);
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
                todos: state.todos.filter((item) => item !== action.payload.todo)
            };

        case EDITTODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.props.id === action.payload.todo.props.id) {
                        const updatedTodo = new TodoItem(todo.parent, {
                            id: todo.props.id,
                            text: action.payload.newText ? action.payload.newText : todo.props.text
                        });
                        updatedTodo.setState({ isEditing : action.payload.isEditing,
                            color: action.payload.color
                        });
                        return updatedTodo;
                    }
                    return todo;
                })
            };
            
        default:
            return {
                ...state,
            };
    }
};
