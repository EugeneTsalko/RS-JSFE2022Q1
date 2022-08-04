export default class NewComponent {
  node: HTMLElement;

  constructor(classNames: Array<string>, innerText = '', tag: keyof HTMLElementTagNameMap = 'div') {
    this.node = document.createElement(tag);
    this.node.classList.add(...classNames);
    this.node.innerText = innerText;
  }

  getNode(): HTMLElement {
    return this.node;
  }

  insertChild(child: NewComponent):void {
    this.node.appendChild(child.getNode());
  }

  insertChilds(childs: NewComponent[]): void {
    childs.forEach((item) => this.insertChild(item));
  }
}
