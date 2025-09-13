import Component from '../core/baseComponent.js';
import {store} from '../../redux/store.js';
import { getCount } from '../../redux/selectors.js';
import { countUp, countDown } from '../../redux/actions.js';

export default class Counter extends Component {
  constructor(parent, props = {}) {
    super(parent, props, 'counter');
  }

  get incrementBtn() {
    return document.querySelector('.increment-btn');
  }

  get decrementBtn() {
    return document.querySelector('.decrement-btn');
  }

  get count() {
    return document.querySelector('.counter-value');
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html({ count : getCount(store.getState()) }));
    store.subscribe(() => this.updateCount());
    this.addEventListeners();
  }

  updateCount() {
    const newCount = getCount(store.getState());
    this.count.textContent = newCount;
  }

  addEventListeners() {
    this.incrementBtn.addEventListener('click', () => {
        store.dispatch(countUp());
    });

    this.decrementBtn.addEventListener('click', () => {
        store.dispatch(countDown());
    });
  }

}