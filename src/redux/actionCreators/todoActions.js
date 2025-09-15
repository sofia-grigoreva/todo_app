import { ADDTODO, DELETETODO, EDITTODO }  from '../actionTypes/todoActionTypes.js';

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