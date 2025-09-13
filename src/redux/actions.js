import { ADDTODO, DELETETODO, EDITTODO }  from '../redux/actionTypes.js';

export const addTodo = (text) => ({
    type: ADDTODO,
    payload: { 
        text
    }
});

export const deleteTodo = (id) => ({
    type: DELETETODO ,
    payload: { 
        id
    }
});

export const editTodo = (id, isEditing, color, newText) => ({
    type: EDITTODO,
    payload: { 
        id, 
        isEditing,
        color, 
        newText
    }
});