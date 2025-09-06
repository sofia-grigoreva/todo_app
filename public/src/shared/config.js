const config = {
  todoInput: {
    id: 'todo-input-container',
    label: 'New TODO',
    inputId: 'todo-input',
    buttonId: 'add-todo-btn',
    buttonText: 'Add',
    buttonDisabled: true,
    placeholder: 'Enter your todo...',
    maxLength: 100,
  },
  todoList: {
    id: 'todos-list',
    items: [
      { id: 1, text: 'Walk the dog' },
      { id: 2, text: 'Water the plants' },
      { id: 3, text: 'Sand the chairs' },
    ],
  },
};

export default config;