export const getTodos = (state) => state.todos || [];

export const getTodoNumber = (state) => Object.keys(state.todos).length;
