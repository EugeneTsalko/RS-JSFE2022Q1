import { CarResponse, ICar } from '../interfaces/interfaces';

const BASE_URL = 'http://127.0.0.1:3000';

const GARAGE = `${BASE_URL}/garage`;
const ENGINE = `${BASE_URL}/engine`;
const WINNERS = `${BASE_URL}/winners`;

const GARAGE_CARS_LIMIT = 7;
const WINNERS_CARS_LIMIT = 10;

export const getCars = async (page: number, limit = WINNERS_CARS_LIMIT): Promise<CarResponse> => {
  const response = await fetch(`${GARAGE}&_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<ICar> => (await fetch(`${GARAGE}/${id}`)).json();
