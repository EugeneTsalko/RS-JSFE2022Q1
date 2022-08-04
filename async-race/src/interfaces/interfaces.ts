export interface ICar {
  name: string,
  color: string,
  id: number,
  isEngine?: boolean
}

// export interface ICarEngine extends ICar {
//   isEngine?: boolean
// }

export interface CarResponse {
  items: ICar[],
  count: string
}

export interface CarRequest {
  name: string,
  color: string
}

export type ISvg = HTMLElement & SVGElement;
