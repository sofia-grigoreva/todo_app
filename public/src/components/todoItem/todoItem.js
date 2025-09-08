import Component from '../core/baseComponent.js';

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

export default class TodoItem extends Component {
  constructor(parent, props) {
    super(parent, props, 'todoItem', { 'deleteItem': null,
      'isEditing': false,
      'color': null
     });
  }

  get self() {
    return document.querySelector(`#todoItem-${this.props.id}`);
  }

  setFunctions(deleteFunction) {
    this.state.deleteItem = deleteFunction;
  }

  render() {
    const context = {
      ...this.state,
      ...this.props,
    }
    this.parent.insertAdjacentHTML('afterbegin', this.html(context));
    this.addEventListeners();
  }

  rerender() {
    const context = {
      ...this.state,
      ...this.props,
    }
    this.self.innerHTML = this.html(context);
    this.addEventListeners();
  }

  addEventListeners() {
    const itemElement = this.self;

    if (this.state.isEditing) {
      const saveBtn = itemElement.querySelector('.save-btn');
      const cancelBtn = itemElement.querySelector('.cancel-btn');
      const editInput = itemElement.querySelector('.edit-input');

      editInput.value = this.props.text;

      saveBtn.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText) {
            this.props.text = newText;
            this.state.isEditing = false;
            this.rerender();
        } else {
          this.state.isEditing = false;
          this.rerender();
        }
      });

      cancelBtn.addEventListener('click', () => {
        this.state.isEditing = false;
        this.rerender();
      });

      editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newText = editInput.value.trim();
          if (newText) {
            this.props.text = newText;
            this.state.isEditing = false;
            this.rerender();
          } else {
            this.state.isEditing = false;
            this.rerender();
          }
        } else if (e.key === 'Escape') {
            this.state.isEditing = false;
            this.rerender();
        }
      });
      
    } else {
      const doneBtn = itemElement.querySelector('.done-btn');
      const textSpan = itemElement.querySelector('.todo-text');

      doneBtn.addEventListener('click', () => {
        this.deleteItem(this);
      });

      textSpan.addEventListener('dblclick', () => {
        this.state.color = generateRandomColor();
        this.state.isEditing = true;
        this.rerender();
      });
    }
  }
}