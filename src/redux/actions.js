import { ADDTODO, DELETETODO, EDITTODO, COUNTUP, COUNTDOWN }  from '../redux/actionTypes.js';

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

export const countUp = (newCount) => ({
    type: COUNTUP
});

export const countDown = (newCount) => ({
    type: COUNTDOWN
});