import Component from '../core/baseComponent.js';

export default class TodoInput extends Component {
  constructor(parent, props = {}) {
    super(parent, props, 'todoInput');
    this.addFunction = null;
  }

  get todoInput() {
    return document.getElementById('todo-input');
  }

  get todoBtn() {
    return document.getElementById('add-todo-btn');
  }

  setAddingTodo(addFunction) {
    this.addFunction = addFunction;
  }

  addTodo() {
    if (this.todoInput.value.length >= 3) {
      this.addFunction(this.todoInput.value);
      this.todoInput.value = '';
      this.todoBtn.disabled = true;
    }
  }

  render() {
    console.log("render");
    this.parent.insertAdjacentHTML('afterbegin', this.html());
    this.addEventListeners();
  }

  addEventListeners() {
    this.todoInput.addEventListener('input', () => {
      this.todoBtn.disabled = this.todoInput.value.length < 3;
    });

    this.todoInput.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') {
        this.addTodo();
      }
    });

    this.todoBtn.addEventListener('click', () => {
      this.addTodo();
    });
  }
}