import { getCars } from './car-api';
import { getWinners } from './winners-api';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners({ page: 1 });

export default {
  carsPage: 1,
  cars,
  carsCount,
  animation: {},
  winnersPage: 1,
  winners,
  winnersCount,
  sortBy: null,
  sortOrder: null,
};
