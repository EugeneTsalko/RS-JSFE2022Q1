export const NewComponent = (tag: string, classNames: Array<string>, innerText = ''): HTMLElement => {
  const tagElement = document.createElement(tag);
  tagElement.classList.add(...classNames);
  tagElement.innerText = innerText;
  return tagElement;
};

export const insertChilds = (element: HTMLElement, childs: HTMLElement[]): void => {
  childs.forEach((item) => element.appendChild(item));
};

export const setAttributes = (element: HTMLElement, attributes: Record<string, string>): void => {
  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
};
