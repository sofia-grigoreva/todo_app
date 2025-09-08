import Component from '../core/baseComponent.js';

export default class TodoInput extends Component {
  constructor(parent, props = {}) {
    super(parent, props, 'todoInput', {buttonDisabled: true});
    this.addTodo = null;
  }

  setAddingTodo(addFunction) {
    this.addTodo = addFunction;
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html(this.state));
    this.addEventListeners();
  }

  addEventListeners() {
    const addTodoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo-btn');

    addTodoInput.addEventListener('input', () => {
      addTodoButton.disabled = addTodoInput.value.length < 3;
    });

    addTodoInput.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter' && addTodoInput.value.length >= 3) {
        this.addTodo(addTodoInput.value);
        addTodoInput.value = '';
        this.setState({buttonDisabled: true})
      }
    });

    addTodoButton.addEventListener('click', () => {
      if (addTodoInput.value.length >= 3 && this.addTodo) {
        this.addTodo(addTodoInput.value);
        addTodoInput.value = '';
        this.setState({buttonDisabled: true})
      }
    });
  }
}