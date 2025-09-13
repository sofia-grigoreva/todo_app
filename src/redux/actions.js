import { ADDTODO, DELETETODO, EDITTODO }  from '../redux/actionTypes.js';

export const addTodo = (text, parent) => ({
    type: ADDTODO,
    payload: { 
        text, 
        parent 
    }
});

export const deleteTodo = (todo) => ({
    type: DELETETODO ,
    payload: { 
        todo 
    }
});

export const editTodo = (todo, isEditing, color, newText) => ({
    type: EDITTODO,
    payload: { 
        todo, 
        isEditing,
        color, 
        newText
    }
});