
const ADDTODO = 'ADDTODO';
const DELETETODO = 'DELETETODO';
const EDITTODO = 'EDITTODO';

export const addTodo = (text, parent) => ({
    type: ADDTODO,
    payload: { text: text, parent: parent }
});

export const deleteTodo = (todo) => ({
    type: DELETETODO ,
    payload: { todo }
});

export const editTodo = (todo, isEditing, color, newText) => ({
    type: EDITTODO,
    payload: { todo: todo, isEditing: isEditing, color: color, newText: newText }
});