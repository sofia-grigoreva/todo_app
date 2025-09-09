import Component from '../core/baseComponent.js';
import TodoItem from '../todoItem/todoItem.js';

export default class TodoList extends Component {
  constructor(parent, props) {
    super(parent, props, 'todoList', { items: [] });
  }

  handleAddTodo(text) {
    const newItemData = {
      id: Date.now(),
      text: text,
      onDeleteItem: this.handleDeleteTodo,
    };

    const newItem = new TodoItem(this.self, newItemData);
    this.setState({
      items: [...this.state.items, newItem],
    });

    this.renderItems();
  }

  handleDeleteTodo = (todo) => {
    this.state.items = this.state.items.filter((item) => item !== todo);
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