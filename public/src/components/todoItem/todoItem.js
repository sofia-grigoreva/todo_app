import Component from '../core/baseComponent.js';

export default class TodoItem extends Component {
  constructor(parent, config) {
    super(parent, config, 'todoItem');
    this.deleteItem = null;
    this.updateItems = null;
    this.isEditing = config.isEditing || false;
  }

  get self() {
    return document.querySelector(`#todoItem-${this.config.id}`);
  }

  setDeletingTodo(deleteFunction) {
    this.deleteItem = deleteFunction;
  }

  setUpdatingTodo(updatingFunction) {
    this.updateItems = updatingFunction;
  }

  setEditing(isEditing) {
    this.isEditing = isEditing;
    this.config.isEditing = isEditing;
    this.rerender();
  }

  rerender() {
    if (this.self) {
      this.self.outerHTML = this.html;
      this.addEventListeners();
    }
  }

  render() {
    this.parent.insertAdjacentHTML('beforeend', this.html);
    this.addEventListeners();
  }

  addEventListeners() {
    const itemElement = this.self;

    if (this.isEditing) {
      const saveBtn = itemElement.querySelector('.save-btn');
      const cancelBtn = itemElement.querySelector('.cancel-btn');
      const editInput = itemElement.querySelector('.edit-input');

      saveBtn.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText) {
          this.updateItems(this.config.id, newText);
        }
        this.setEditing(false);
      });

      cancelBtn.addEventListener('click', () => {
        this.setEditing(false);
      });

      editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newText = editInput.value.trim();
          if (newText) {
            this.updateItems(this.config.id, newText);
          }
          this.setEditing(false);
        } else if (e.key === 'Escape') {
          this.setEditing(false);
        }
      });
      
    } else {
      const doneBtn = itemElement.querySelector('.done-btn');
      const textSpan = itemElement.querySelector('.todo-text');

      doneBtn.addEventListener('click', () => {
        this.deleteItem(this.config.id);
      });

      textSpan.addEventListener('dblclick', () => {
        this.setEditing(true);
      });
    }
  }
}