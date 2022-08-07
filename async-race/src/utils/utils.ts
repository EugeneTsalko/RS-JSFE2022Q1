/* eslint-disable linebreak-style */
import { drive, startEngine, stopEngine } from '../api/car-api';
import state from '../api/state';
import {
  CarRequest, ICar, RaceResponse, StartDrivingFunction,
} from '../interfaces/interfaces';

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

export const getRandomCarsArr = (): Array<CarRequest> => new Array(100).fill(null)
  .map(() => ({ name: getRandomCarName(), color: getRandomColor() }));

function getPositionAtCenter(element: HTMLElement): { x: number, y: number } {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export function animateCar(car: HTMLElement, distance: number, animationTime: number) {
  let start: unknown = null;
  const animationBody: { id: string | number } = { id: null };

  function step(timestamp: number): void {
    if (!start) start = timestamp;
    const time = timestamp - (start as number);
    const passed = Math.round(time * (distance / animationTime));
    const animatedCar = car;
    animatedCar.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      animationBody.id = window.requestAnimationFrame(step);
    }
  }
  animationBody.id = window.requestAnimationFrame(step);
  return animationBody;
}

export const startDriving = async (id: number): Promise<RaceResponse> => {
  const startButton = document.getElementById(`start-engine-car-${id}`);
  const stopBtn = document.getElementById(`stop-engine-car-${id}`);
  (startButton as HTMLButtonElement).disabled = true;
  (stopBtn as HTMLButtonElement).disabled = false;

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);

  const car = document.getElementById(`car-${id}`);
  const flag = document.getElementById(`flag-${id}`);
  const htmlDistance = Math.floor(getDistanceBetweenElements(car, flag) + 50);

  (state.animation as Record<string, unknown>).id = animateCar(car, htmlDistance, time);

  const { success } = await drive(id);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!success) window.cancelAnimationFrame(state.animation.id.id);
  (startButton as HTMLButtonElement).disabled = false;

  return { success, id, time };
};

export const stopDriving = async (id: number) => {
  await stopEngine(id);
  const car = document.getElementById(`car-${id}`);
  car.style.transform = '';

  if ((state.animation as Record<string, unknown>).id) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    window.cancelAnimationFrame(state.animation.id.id);
  }
};

// eslint-disable-next-line max-len
export const raceAll = async (promiseArr: Promise<RaceResponse>[], idArr: number[]): Promise<ICar> => {
  const { success, id, time } = await Promise.race(promiseArr);

  if (!success) {
    const failIndex = idArr.findIndex((i: number) => i === id);
    // eslint-disable-next-line max-len
    const restPromises = [...promiseArr.slice(0, failIndex), ...promiseArr.slice(failIndex + 1, promiseArr.length)];
    const restIds = [...idArr.slice(0, failIndex), ...idArr.slice(failIndex + 1, idArr.length)];
    return raceAll(restPromises, restIds);
  }

  return { ...state.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
};

export const race = async (startDrivingFunc: StartDrivingFunction): Promise<ICar> => {
  const promiseArr = state.cars.map(({ id }) => startDrivingFunc(id));

  const winner: ICar = await raceAll(promiseArr, state.cars.map((car) => car.id));

  return winner;
};
