/* eslint-disable linebreak-style */

import { getCars } from '../../api/car-api';
import { GARAGE_CARS_LIMIT } from '../../api/constants-api';
import state from '../../api/state';
import { insertChilds, NewComponent } from '../../components/new-component';
import renderTrack from '../car/render-car';

export const renderGarage = (): void => {
  const garageContainer = NewComponent('div', ['garage-container']);
  garageContainer.setAttribute('id', 'garage-container');

  const h1 = NewComponent('h1', ['header-garage'], `Garage (${state.carsCount})`);

  const h2 = NewComponent('h2', ['header-page'], `Page #${state.carsPage}`);

  const trackList = NewComponent('ul', ['garage']);

  state.cars.forEach((el) => {
    const li = NewComponent('li', ['track']);

    li.appendChild(renderTrack(el));
    trackList.appendChild(li);
  });

  insertChilds(garageContainer, [h1, h2, trackList]);

  document.body.appendChild(garageContainer);
};

export const updateStateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(state.carsPage);
  state.cars = items;
  state.carsCount = count;

  if (state.carsPage * GARAGE_CARS_LIMIT < +state.carsCount) {
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
