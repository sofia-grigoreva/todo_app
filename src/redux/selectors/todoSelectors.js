export const getTodos = (state) => state.todo.todos || [];

export const getTodoNumber = (state) => state.todo.todos.length;
