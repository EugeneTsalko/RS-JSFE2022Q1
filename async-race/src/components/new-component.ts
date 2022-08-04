export default class NewComponent {
  node: HTMLElement;

  constructor(classNames: Array<string>, innerText = '', tag: keyof HTMLElementTagNameMap = 'div') {
    this.node = document.createElement(tag);
    this.node.classList.add(...classNames);
    this.node.innerText = innerText;
  }
}
