
export interface Product {
  id: string,
  name: string,
  img: string,
  price: number,
  stock: string,
  strings: number,
  producer: string,
  type: string,
  pickups: string,
  popular: boolean,
}

export interface IElement extends HTMLElement {
  value?: string;
}

export interface InoUiSlider extends HTMLElement {
  noUiSlider: {
    // get: () => string[];
    get: (unencoded?: boolean) => string[];
  }
}
