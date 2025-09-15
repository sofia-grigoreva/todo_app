import Component from '../core/baseComponent.js';

export default class Image extends Component {
  constructor(parent, props = {}) {
    super(parent, props, 'image');
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html({ id: this.props.id, src: this.props.src, class: this.props.class, alt: this.props.alt, height: this.props.height }));
  }

  render() {
  this.parent.insertAdjacentHTML('afterbegin', this.html({ 
    id: this.props.id, 
    src: this.props.src || 'cat.jpeg', 
    class: this.props.class || 'image', 
    alt: this.props.alt || 'Image', 
    height: this.props.height || 200
  }));
}
}