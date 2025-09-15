import TodoInput from '../../components/todoInput/todoInput.js';
import TodoList from '../../components/todoList/todoList.js';
import Image from '../../components/image/image.js';
import TodoCounter from '../../components/todoCounter/todoCounter.js';
import Counter from '../../components/counter/counter.js';

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

    const counter = new Counter(this.#self, { id: 'counter'});
    counter.render();

    this.todoList = new TodoList(this.#self, { id: 'todo-list'});
    this.todoList.render();

    const todoInput = new TodoInput(this.#self, { id: 'todo-input', onSubmit: this.todoList.handleAddTodo });
    todoInput.render();

    const todoCounter = new TodoCounter(this.#self, { id: 'todo-counter'});
    todoCounter.render();

    const image = new Image(this.#self, { id: 'img', src: 'cat.jpeg', class: 'image', alt: 'Image', height: '200'});
    image.render();
  }
}

