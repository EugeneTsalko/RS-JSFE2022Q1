export interface ICar {
  name: string,
  color: string,
  id: number
}

export interface CarResponse {
  items: ICar[],
  count: string
}

export interface CarRequest {
  name: string,
  color: string
}
