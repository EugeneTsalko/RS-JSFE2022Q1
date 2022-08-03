import { CarResponse, CarRequest, ICar } from '../interfaces/interfaces';

const BASE_URL = 'http://127.0.0.1:3000';

const GARAGE_URL = `${BASE_URL}/garage`;
// const ENGINE_URL = `${BASE_URL}/engine`;
// const WINNERS_URL = `${BASE_URL}/winners`;

// const GARAGE_CARS_LIMIT = 7;
const WINNERS_CARS_LIMIT = 10;

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
