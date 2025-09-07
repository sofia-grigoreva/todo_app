import Component from '../core/baseComponent.js';

export default class TodoInput extends Component {
  constructor(parent, config) {
    super(parent, config, 'todoInput');
    this.addTodo = null;
  }

  setAddingTodo(addFunction) {
    this.addTodo = addFunction;
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html);
    this.addEventListeners();
  }

  addEventListeners() {
    const addTodoInput = document.getElementById(this.config.inputId);
    const addTodoButton = document.getElementById(this.config.buttonId);

    addTodoInput.addEventListener('input', () => {
      addTodoButton.disabled = addTodoInput.value.length < 3;
    });

    addTodoInput.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter' && addTodoInput.value.length >= 3) {
        this.addTodo(addTodoInput.value);
        addTodoInput.value = '';
        addTodoButton.disabled = true;
      }
    });

    addTodoButton.addEventListener('click', () => {
      if (addTodoInput.value.length >= 3 && this.addTodo) {
        this.addTodo(addTodoInput.value);
        addTodoInput.value = '';
        addTodoButton.disabled = true;
      }
    });
  }
}