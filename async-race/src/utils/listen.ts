/* eslint-disable linebreak-style */
import {
  createCar, deleteCar, getCar, updateCar,
} from '../api/car-api';
import state from '../api/state';
import { ICar } from '../interfaces/interfaces';
import renderGarage, { updateStateGarage } from '../ui/car/render-car';
import getRandomCarsArr, { startDriving } from './utils';

let selectedCar: ICar = null;

const listen = () => {
  document.body.addEventListener('click', async (event) => {
    // eslint-disable-next-line no-console
    console.log((event.target as HTMLElement));
    const fullId = (event.target as HTMLElement).id.split('-');
    const id = +fullId[fullId.length - 1];

    if ((event.target as HTMLElement).classList.contains('select-btn')) {
      selectedCar = await getCar(id);
      // console.log(selectedCar);
      (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
      (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
    }

    if ((event.target as HTMLElement).classList.contains('remove-btn')) {
      await deleteCar(id);
      // console.log(id);
      await updateStateGarage();
      document.getElementById('garage-container').remove();
      renderGarage();
      // console.log(state.cars);
    }

    if ((event.target as HTMLElement).classList.contains('generate-cars-btn')) {
      const cars = getRandomCarsArr();
      await Promise.all(cars.map(async (car) => createCar(car)));
      await updateStateGarage();
      document.getElementById('garage-container').remove();
      renderGarage();
    }

    if ((event.target as HTMLElement).classList.contains('next-btn')) {
      state.carsPage += 1;
      await updateStateGarage();
      document.getElementById('garage-container').remove();
      renderGarage();
    }

    if ((event.target as HTMLElement).classList.contains('prev-btn')) {
      state.carsPage -= 1;
      await updateStateGarage();
      document.getElementById('garage-container').remove();
      renderGarage();
    }

    if ((event.target as HTMLElement).classList.contains('start-engine-btn')) {
      await startDriving(id);
    }
  });

  document.getElementById('create').addEventListener('submit', async () => {
    const carName = (document.getElementById('create-name') as HTMLInputElement).value;
    const carColor = (document.getElementById('create-color') as HTMLInputElement).value;
    const newCar = { name: carName, color: carColor };
    await createCar(newCar);
    await updateStateGarage();
    document.getElementById('garage-container').remove();
    renderGarage();
    (document.getElementById('create-name') as HTMLInputElement).value = '';
    (document.getElementById('create-color') as HTMLInputElement).value = '#ffffff';
  });

  document.getElementById('update').addEventListener('submit', async () => {
    const carName = (document.getElementById('update-name') as HTMLInputElement).value;
    const carColor = (document.getElementById('update-color') as HTMLInputElement).value;
    const updatedCar = { name: carName, color: carColor };
    await updateCar(selectedCar.id, updatedCar);
    await updateStateGarage();
    document.getElementById('garage-container').remove();
    renderGarage();
    (document.getElementById('update-name') as HTMLInputElement).value = '';
    (document.getElementById('update-color') as HTMLInputElement).value = '#ff0000';
  });
};

export default listen;
