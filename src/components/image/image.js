import Component from '../core/baseComponent.js';

export default class Image extends Component {
  constructor(parent, props = {}) {
    super(parent, props, 'image');
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html({ id: this.props.id, src: this.props.src }));
  }
}