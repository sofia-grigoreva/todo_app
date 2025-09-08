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

  get saveBtn() {
    return this.self.querySelector('.save-btn');
  }

  get cancelBtn() {
    return this.self.querySelector('.cancel-btn');
  }

  get editInput() {
    return this.self.querySelector('.edit-input');
  }

  get doneBtn() {
    return this.self.querySelector('.done-btn');
  }

  get textSpan() {
    return this.self.querySelector('.todo-text');
  }

  addEventListeners() {
    const itemElement = this.self;

    if (this.state.isEditing) {
      this.editInput.value = this.props.text;

      this.saveBtn.addEventListener('click', () => {
        const newText = this.editInput.value.trim();
        if (newText) {
            this.props.text = newText;
            this.state.isEditing = false;
            this.rerender();
        } else {
          this.state.isEditing = false;
          this.rerender();
        }
      });

      this.cancelBtn.addEventListener('click', () => {
        this.state.isEditing = false;
        this.rerender();
      });

      this.editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newText = this.editInput.value.trim();
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
      this.doneBtn.addEventListener('click', () => {
        this.state.deleteItem(this);
      });

      this.textSpan.addEventListener('dblclick', () => {
        this.state.color = generateRandomColor();
        this.state.isEditing = true;
        this.rerender();
      });
    }
  }
}