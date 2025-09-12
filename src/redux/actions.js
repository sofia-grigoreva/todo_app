
const ADDTODO = 'ADDTODO';
const DELETETODO = 'DELETETODO';
const CHANGETODO = 'CHANGETODO';

export const addTodo = (text, parent) => ({
    type: ADDTODO,
    payload: { text: text, parent: parent }
});

export const deleteTodo = (todo) => ({
    type: DELETETODO ,
    payload: { todo }
});

export const editTodo = (todo, newText) => ({
    type: CHANGETODO,
    payload: { todo: todo, newText: newText }
});