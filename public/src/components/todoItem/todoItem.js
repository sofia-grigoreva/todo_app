import Component from '../core/baseComponent.js';

export default class TodoItem extends Component {
  constructor(parent, config) {
    super(parent, config, 'todoItem');
    this.deleteItem = null;
    this.updateItems = null;
    this.editState = null;
    if (!config.color) {
      this.config.color = this.generateRandomColor();
    }
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

  setEditingTodo(editingFunction) {
    this.editState = editingFunction;
  }

  generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  render() {
    const template = window.Handlebars.templates['todoItem.hbs'];
    
    const templateData = {
      ...this.config,
      color: this.config.color,
    };
    
    const html = template(templateData);
    this.parent.insertAdjacentHTML('beforeend', html);
    
    this.addEventListeners();
  }

  addEventListeners() {
    const itemElement = this.self;

    if (this.config.isEditing) {
      const saveBtn = itemElement.querySelector('.save-btn');
      const cancelBtn = itemElement.querySelector('.cancel-btn');
      const editInput = itemElement.querySelector('.edit-input');

      editInput.value = this.config.text;

      saveBtn.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText) {
          this.updateItems(this.config.id, newText);
        } else {
          this.editState(this.config.id, false); 
        }
      });

      cancelBtn.addEventListener('click', () => {
        this.editState(this.config.id, false);
      });

      editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newText = editInput.value.trim();
          if (newText) {
            this.updateItems(this.config.id, newText);
          } else {
            this.editState(this.config.id, false);
          }
        } else if (e.key === 'Escape') {
          this.editState(this.config.id, false);
        }
      });
      
    } else {
      const doneBtn = itemElement.querySelector('.done-btn');
      const textSpan = itemElement.querySelector('.todo-text');

      doneBtn.addEventListener('click', () => {
        this.deleteItem(this.config.id);
      });

      textSpan.addEventListener('dblclick', () => {
        this.config.color = this.generateRandomColor();
        this.editState(this.config.id, true);
      });
    }
  }
}