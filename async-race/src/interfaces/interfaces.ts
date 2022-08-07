export interface ICar {
  name: string,
  color: string,
  id: number,
  isEngine?: boolean,
  time?: number
}

export interface EngineResponse {
  velocity: number,
  distance: number
}

export interface CarResponse {
  items: ICar[],
  count: string
}

export interface CarRequest {
  name: string,
  color: string
}

export interface RaceResponse {
  success: boolean,
  id: number,
  time: number
}

export type ISvg = HTMLElement & SVGElement;

export type StartDrivingFunction = (id: number) => Promise<RaceResponse>;
