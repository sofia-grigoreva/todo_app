import Component from '../core/baseComponent.js';
import { generateRandomColor } from '../../helpers/colorHelper.js';

export default class TodoItem extends Component {
  constructor(parent, props) {
    super(parent, props, 'todoItem', {
      isEditing: false,
      color: null,
    });
  }

  get self() {
    return document.querySelector(`#todoItem-${this.props.id}`);
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

  setIsEditing(isEditing) {
    this.state.isEditing = isEditing;
    this.rerender();
  }

  render() {
    const context = {
      id: this.props.id,
      text: this.props.text,
      color: this.state.color,
      isEditing: this.state.isEditing,
    };
    this.parent.insertAdjacentHTML('afterbegin', this.html(context));
    this.addEventListeners();
  }

  rerender() {
    const context = {
      id: this.props.id,
      text: this.props.text,
      color: this.state.color,
      isEditing: this.state.isEditing,
    };
    this.self.innerHTML = this.html(context);
    this.addEventListeners();
  }

  addEventListeners() {
    if (this.state.isEditing) {
      this.editInput.value = this.props.text;

      this.saveBtn.addEventListener('click', () => {
        const newText = this.editInput.value.trim();
        if (newText) {
          this.props.text = newText;
        }
        this.setIsEditing(false);
      });

      this.cancelBtn.addEventListener('click', () => {
        this.setIsEditing(false);
      });

      this.editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newText = this.editInput.value.trim();
          if (newText) {
            this.props.text = newText;
          } 
          this.setIsEditing(false);
        } else if (e.key === 'Escape') {
          this.setIsEditing(false);
        }
      });
    } else {
      this.doneBtn.addEventListener('click', () => {
        this.props.onDeleteItem(this);
      });

      this.textSpan.addEventListener('dblclick', () => {
        this.state.color = generateRandomColor();
        this.setIsEditing(true);
      });
    }
  }
}