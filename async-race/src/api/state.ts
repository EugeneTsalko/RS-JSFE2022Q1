import { getCars } from './car-api';

const { items: cars, count: carsCount } = await getCars(1);

export default {
  carsPage: 1,
  cars,
  carsCount,
  animation: {},
};

// console.log(cars);

// export const a = await getCars(1);

// const items = await getCars();

// export default items;
