import Component from '../core/baseComponent.js';
import TodoItem from '../todoItem/todoItem.js';
import {store} from '../../redux/store.js';
import { addTodo } from '../../redux/actionCreators/todoActions.js';
import { getTodos } from '../../redux/selectors/index.js';

export default class TodoList extends Component {
  constructor(parent, props) {
    super(parent, props, 'todoList', { todos: [] });
  }

  handleAddTodo(text) {
    store.dispatch(addTodo(text));
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