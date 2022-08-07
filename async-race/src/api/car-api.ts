import {
  CarResponse, CarRequest, ICar, EngineResponse,
} from '../interfaces/interfaces';
import { GARAGE_URL, ENGINE_URL, GARAGE_CARS_LIMIT } from './constants-api';

// eslint-disable-next-line max-len
export const getCars = async (page: number, limit = GARAGE_CARS_LIMIT): Promise<CarResponse> => {
  const response = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<ICar> => ((await fetch(`${GARAGE_URL}/${id}`)).json()) as Promise<ICar>;

export const createCar = async (body: CarRequest): Promise<CarResponse> => ((await fetch(
  GARAGE_URL,
  {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  },
)).json()) as Promise<CarResponse>;

export const deleteCar = async (id: number): Promise<CarResponse> => ((await fetch(`${GARAGE_URL}/${id}`, { method: 'DELETE' })).json()) as Promise<CarResponse>;

export const updateCar = async (id: number, body: CarRequest): Promise<CarResponse> => (
  (await fetch(
    `${GARAGE_URL}/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
      },
    },
  )).json()) as Promise<CarResponse>;

export const startEngine = async (id: number): Promise<EngineResponse> => ((await fetch(`${ENGINE_URL}?id=${id}&status=started`, { method: 'PATCH' })).json()) as Promise<EngineResponse>;

export const stopEngine = async (id: number): Promise<EngineResponse> => ((await fetch(`${ENGINE_URL}?id=${id}&status=stopped`, { method: 'PATCH' })).json()) as Promise<EngineResponse>;

export const drive = async (id: number): Promise<{ success: boolean; }> => {
  const res = await fetch(`${ENGINE_URL}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};
