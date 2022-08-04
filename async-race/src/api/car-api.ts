import { CarResponse, CarRequest, ICar } from '../interfaces/interfaces';
import { GARAGE_URL, WINNERS_CARS_LIMIT } from './constants-api';

export const getCars = async (page: number, limit = WINNERS_CARS_LIMIT): Promise<CarResponse> => {
  const response = await fetch(`${GARAGE_URL}&_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<ICar> => (await fetch(`${GARAGE_URL}/${id}`)).json();

export const createCar = async (body: CarRequest): Promise<CarResponse> => (await fetch(
  GARAGE_URL,
  {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  },
)).json();

export const deleteCar = async (id: number): Promise<CarResponse> => (await fetch(`${GARAGE_URL}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: CarRequest): Promise<CarResponse> => (await fetch(
  `${GARAGE_URL}/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  },
)).json();
