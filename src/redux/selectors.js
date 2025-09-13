export const getTodos = (state) => state.todo.todos || [];

export const getTodoNumber = (state) => Object.keys(state.todo.todos).length;

export const getCount = (state) => state.counter.count;
