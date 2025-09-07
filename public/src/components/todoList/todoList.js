import Component from '../core/baseComponent.js';
import TodoItem from '../todoItem/todoItem.js';

export default class TodoList extends Component {
  constructor(parent, config) {
    super(parent, config, 'todoList');
    this.items = config.items || [];
  }

  addTodo(text) {
    const newItem = {
      id: Date.now(),
      text: text,
      isEditing: false,
    };

    this.items.push(newItem);
    this.renderItems();
  }

  deleteTodo(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.renderItems();
    }
  }

  updateTodo(id, newText) {
    const todoIndex = this.items.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      this.items[todoIndex].text = newText;
      this.setEditing(id, false);
    }
  }

  setEditing(id, isEditing) {
    const todoIndex = this.items.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      this.items[todoIndex].isEditing = isEditing;
      this.renderItems();
    }
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html);
    this.renderItems();
  }

  renderItems() {
    this.self.innerHTML = '';
    this.items.forEach((data) => {
      const todoItem = new TodoItem(this.self, data);
      todoItem.setDeletingTodo((id) => this.deleteTodo(id));
      todoItem.setUpdatingTodo((id, newText) => this.updateTodo(id, newText));
      todoItem.setEditingTodo((id, isEditing) => this.setEditing(id, isEditing));
      todoItem.render();
    });
  }
}