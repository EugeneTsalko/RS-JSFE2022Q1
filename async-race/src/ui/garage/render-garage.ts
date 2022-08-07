/* eslint-disable linebreak-style */

import { getCars } from '../../api/car-api';
import state from '../../api/state';
import renderTrack from '../car/render-car';

export const renderGarage = (): void => {
  const garageContainer = document.createElement('div');
  garageContainer.classList.add('garage-container');
  garageContainer.setAttribute('id', 'garage-container');

  const h1 = document.createElement('h1');
  h1.innerText = `Garage (${state.carsCount})`;

  const h2 = document.createElement('h2');
  h2.innerText = `Page #${state.carsPage}`;

  const trackList = document.createElement('ul');
  trackList.classList.add('garage');

  state.cars.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('track');

    li.appendChild(renderTrack(el));
    trackList.appendChild(li);
  });

  garageContainer.appendChild(h1);
  garageContainer.appendChild(h2);
  garageContainer.appendChild(trackList);

  document.body.appendChild(garageContainer);
};

export const updateStateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(state.carsPage);
  state.cars = items;
  state.carsCount = count;

  if (state.carsPage * 7 < +state.carsCount) {
    (document.getElementById('next') as HTMLButtonElement).disabled = false;
  } else {
    (document.getElementById('next') as HTMLButtonElement).disabled = true;
  }

  if (state.carsPage > 1) {
    (document.getElementById('prev') as HTMLButtonElement).disabled = false;
  } else {
    (document.getElementById('prev') as HTMLButtonElement).disabled = true;
  }
};
