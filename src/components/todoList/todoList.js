import Component from '../core/baseComponent.js';
import TodoItem from '../todoItem/todoItem.js';
import {store} from '../../redux/store.js';
import { addTodo } from '../../redux/actions.js';
import { getTodos } from '../../redux/selectors.js';

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
    const todos = getTodos(store.getState());
  
    todos.forEach((todo) => {
        let todoItem = new TodoItem(this.self, {
          id: todo.id,
          text: todo.text
        });
        todoItem.setState( {
          isEditing: todo.isEditing,
          color: todo.color 
        })
        todoItem.render();
      });
  }
}