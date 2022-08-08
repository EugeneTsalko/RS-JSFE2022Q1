// export default class NewComponent {
//   node: HTMLElement;

// eslint-disable-next-line max-len
//   constructor(classNames: Array<string>, innerText = '', tag: keyof HTMLElementTagNameMap = 'div') {
//     this.node = document.createElement(tag);
//     this.node.classList.add(...classNames);
//     this.node.innerText = innerText;
//   }

//   getNode(): HTMLElement {
//     return this.node;
//   }

//   insertChild(child: NewComponent):void {
//     this.node.appendChild(child.getNode());
//   }

//   insertChilds(childs: NewComponent[]): void {
//     childs.forEach((item) => this.insertChild(item));
//   }
// }

export const NewComponent = (tag: string, classNames: Array<string>, innerText = ''): HTMLElement => {
  const tagElement = document.createElement(tag);
  tagElement.classList.add(...classNames);
  tagElement.innerText = innerText;
  return tagElement;
};

export const insertChilds = (element: HTMLElement, childs: HTMLElement[]): void => {
  childs.forEach((item) => element.appendChild(item));
};
