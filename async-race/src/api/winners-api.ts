import { WinnersRequest, WinnersResponse, WinnerStat } from '../interfaces/interfaces';
import { getCar } from './car-api';
import { WINNERS_CARS_LIMIT, WINNERS_URL } from './constants-api';

export const getWinners = async ({ page, limit = WINNERS_CARS_LIMIT }: WinnersRequest):
Promise<WinnersResponse> => {
  const response = await fetch(`${WINNERS_URL}?_page=${page}&limit=${limit}}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async (winner: { id: number; }) => (
      { ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<WinnerStat> => (await fetch(`${WINNERS_URL}/${id}`)).json();

export const createWinner = async (body: WinnerStat): Promise<WinnerStat> => (
  await fetch(WINNERS_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const deleteWinner = async (id: number): Promise<Record<string, unknown>> => (
  await fetch(`${WINNERS_URL}/${id}`, { method: 'DELETE' })).json();

export const updateWinner = async (id: number, body: WinnerStat) : Promise<WinnerStat> => (await fetch(`${WINNERS_URL}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const saveWinner = async ({ id, time }: WinnerStat): Promise<void> => {
  const winnerStatus: number = (await fetch(`${WINNERS_URL}/${id}`)).status;

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
