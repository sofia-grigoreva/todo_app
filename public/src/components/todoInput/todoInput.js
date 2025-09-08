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

  get todoInput() {
    return document.getElementById('todo-input');
  }

  get todoBtn() {
    return document.getElementById('add-todo-btn');
  }

  addEventListeners() {
    this.todoInput.addEventListener('input', () => {
      this.todoBtn.disabled = this.todoInput.value.length < 3;
    });

    this.todoInput.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter' && this.todoInput.value.length >= 3) {
        this.addTodo(this.todoInput.value);
        this.todoInput.value = '';
        this.setState({buttonDisabled: true})
      }
    });

    this.todoBtn.addEventListener('click', () => {
      if (this.todoInput.value.length >= 3) {
        this.addTodo(this.todoInput.value);
        this.todoInput.value = '';
        this.setState({buttonDisabled: true})
      }
    });
  }
}