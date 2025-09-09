import TodoInput from '../../components/todoInput/todoInput.js';
import TodoList from '../../components/todoList/todoList.js';

export default class Home {
  #parent;
  #self;

  constructor(rootElement) {
    this.#parent = rootElement;
  }

  render() {
    this.#self = document.createElement('div');
    this.#self.id = 'home-page';

    this.#parent.appendChild(this.#self);

    const todoList = new TodoList(this.#self, { id: 'todo-list'});
    todoList.render();

    const todoInput = new TodoInput(this.#self, { id: 'todo-input', addFunction: (text) => todoList.addTodo(text)});
    todoInput.render();
  }
}