import TodoItem from '../components/todoItem/todoItem.js';

const initialState = {
    todos: [],
};

const ADDTODO = 'ADDTODO';
const DELETETODO = 'DELETETODO';
const CHANGETODO = 'CHANGETODO';

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

case CHANGETODO:
    return {
        ...state,
        todos: state.todos.map(todo => {
            if (todo === action.payload.todo) {
                console.log(action.payload.newText);
                const updatedTodo = new TodoItem(todo.parent, {
                    id: todo.props.id,
                    text: action.payload.newText
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
