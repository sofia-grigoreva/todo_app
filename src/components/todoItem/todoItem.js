import Component from '../core/baseComponent.js';
import { generateRandomColor } from '../../helpers/colorHelper.js';
import {store} from '../../redux/store.js';
import { deleteTodo, editTodo } from '../../redux/actions.js';

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

  render() {
    console.log("item render");
    const context = {
      id: this.props.id,
      text: this.props.text,
      color: this.state.color,
      isEditing: this.state.isEditing,
    };
    this.parent.insertAdjacentHTML('afterbegin', this.html(context));
    this.addEventListeners();
  }

  addEventListeners() {
    if (this.state.isEditing) {
      this.editInput.value = this.props.text;

      this.saveBtn.addEventListener('click', () => {
        const newText = this.editInput.value.trim();
        store.dispatch(editTodo(this, false, this.state.color, newText));
      });

      this.cancelBtn.addEventListener('click', () => {
        store.dispatch(editTodo(this, false, this.state.color));
      });

      this.editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const newText = this.editInput.value.trim();
          store.dispatch(editTodo(this, false, this.state.color, newText));
        } else if (e.key === 'Escape') {
          store.dispatch(editTodo(this, false, this.state.color));
        }
      });
    } else {
      this.doneBtn.addEventListener('click', () => {
        store.dispatch(deleteTodo(this));
      });

      this.textSpan.addEventListener('dblclick', () => {
        store.dispatch(editTodo(this, true, generateRandomColor()));
      });
    }
  }
}