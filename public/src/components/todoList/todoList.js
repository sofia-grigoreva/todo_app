import Component from '../core/baseComponent.js';
import TodoItem from '../todoItem/todoItem.js';

export default class TodoList extends Component {
  constructor(parent, props) {
    super(parent, props, 'todoList', { items: [] });
  }

  addTodo(text) {
    const newItemData = {
      id: Date.now(),
      text: text,
    };

    const newItem = new TodoItem(this.self, newItemData);
    newItem.setFunctions(this.deleteTodo);
    this.setState({
      items: [...this.state.items, newItem],
    });

    this.renderItems();
  }

  deleteTodo = (todo) => {
    const newItems = this.state.items.filter((item) => item !== todo);
    this.state.items = newItems;
    this.renderItems();
  };

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html());
    this.renderItems();
  }

  renderItems() {
    this.self.innerHTML = '';
    this.state.items.forEach((todoItem) => {
      todoItem.render();
    });
  }
}