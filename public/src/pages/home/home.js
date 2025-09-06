import config from '../../shared/config.js';
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

    const todoList = new TodoList(this.#self, config.todoList);
    todoList.render();

    const todoInput = new TodoInput(this.#self, config.todoInput);
    todoInput.setAddingTodo((text) => todoList.addTodo(text));
    todoInput.render();
  }
}