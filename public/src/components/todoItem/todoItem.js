import Component from '../core/baseComponent.js';

export default class TodoItem extends Component {
  constructor(parent, config) {
    super(parent, config, 'todoItem');
    this.deleteItem = null;
    this.updateItems = null;
    this.isEditing = config.isEditing || false;
    this.color = this.generateRandomColor();
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

  generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  setEditing(isEditing) {
    this.isEditing = isEditing;
    this.render(true);
  }

  render(isRerender = false) {
    const template = window.Handlebars.templates['todoItem.hbs'];
    
    const templateData = {
      ...this.config,
      isEditing: this.isEditing,
      color: this.color,
    };
    
    const html = template(templateData);
    
    if (isRerender) {
      this.color = this.generateRandomColor();
      this.self.outerHTML = html;
    } else {
      this.parent.insertAdjacentHTML('beforeend', html);
    }
    
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