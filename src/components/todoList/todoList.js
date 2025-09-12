import Component from '../core/baseComponent.js';
import {store} from '../../redux/store.js';
import { addTodo } from '../../redux/actions.js';

export default class TodoList extends Component {
  constructor(parent, props) {
    super(parent, props, 'todoList', { todos: [] });
  }

  handleAddTodo(text) {
    store.dispatch(addTodo(text, this.self));
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html());
    store.subscribe(() => this.rendertodos());
    this.rendertodos();
  }

  rendertodos() {
    this.self.innerHTML = '';
    console.log("list");
    console.log(store.getState());
    if (store.getState().todos) {
      store.getState().todos.forEach((todoItem) => {
        todoItem.render();
      });
    }
  }
}