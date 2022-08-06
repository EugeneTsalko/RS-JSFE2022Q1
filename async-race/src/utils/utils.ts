/* eslint-disable linebreak-style */
import { startEngine } from '../api/car-api';

/* eslint-disable linebreak-style */
const carNames = ['Jaguar', 'Ferrari', 'BMW', 'VW', 'ZAZ', 'Opel', 'Saab', 'Porsche', 'Lada', 'Audi'];
const carModels = ['XKR', 'Enzo', '316', 'Passat', '968M', 'Vectra', '9000', 'Cayenne', '2108', '80'];

const getRandomCarName = (): string => {
  const carName = carNames[Math.floor(Math.random() * carNames.length)];
  const carModel = carModels[Math.floor(Math.random() * carModels.length)];
  return `${carName} ${carModel}`;
};

const getRandomColor = (): string => {
  const letters = '0123456789ADCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomCarsArr = () => new Array(100).fill(null)
  .map(() => ({ name: getRandomCarName(), color: getRandomColor() }));

export default getRandomCarsArr;

function getPositionAtCenter(element: HTMLElement) {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export const startDriving = async (id: number) => {
  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);
  // eslint-disable-next-line no-console
  console.log(time);
};
