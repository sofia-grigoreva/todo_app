import Component from '../core/baseComponent.js';
import {store} from '../../redux/store.js';
import { getTodoNumber } from '../../redux/selectors/todoSelectors.js';

export default class TodoCounter extends Component {
  constructor(parent, props = {}) {
    super(parent, props, 'todoCounter');
  }

  get number() {
    return this.self.querySelector('.todo-number');
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html({ todoNumber : getTodoNumber(store.getState()) }));
    store.subscribe(() => this.updateNumber());
  }

  updateNumber() {
    const newNumber = getTodoNumber(store.getState());
    this.number.textContent = newNumber;
  }

}