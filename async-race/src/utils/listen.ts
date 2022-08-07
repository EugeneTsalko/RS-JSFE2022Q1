/* eslint-disable linebreak-style */
import {
  createCar, deleteCar, getCar, updateCar,
} from '../api/car-api';
import state from '../api/state';
import { ICar } from '../interfaces/interfaces';
import { renderGarage, updateStateGarage } from '../ui/garage/render-garage';
import {
  getRandomCarsArr, race, startDriving, stopDriving,
} from './utils';

let selectedCar: ICar = null;

const listen = () => {
  document.body.addEventListener('click', async (event) => {
    // eslint-disable-next-line no-console
    console.log((event.target as HTMLElement));
    const fullId = (event.target as HTMLElement).id.split('-');
    const id = +fullId[fullId.length - 1];

    if ((event.target as HTMLElement).classList.contains('select-btn')) {
      (document.getElementById(`select-car-${id}`) as HTMLInputElement).classList.toggle('select-btn_active');
      selectedCar = await getCar(id);
      (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
      (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
    }

    if ((event.target as HTMLElement).classList.contains('remove-btn')) {
      await deleteCar(id);
      await updateStateGarage();
      document.getElementById('garage-container').remove();
      renderGarage();
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
      startDriving(id);
    }

    if ((event.target as HTMLElement).classList.contains('stop-engine-btn')) {
      stopDriving(id);
    }

    if ((event.target as HTMLElement).classList.contains('start-race-btn')) {
      (document.getElementById('start-race') as HTMLButtonElement).disabled = true;
      const winner = await race(startDriving);
      // eslint-disable-next-line no-alert
      alert(`winner: ${winner.name}, time: ${winner.time}`);
    }

    if ((event.target as HTMLElement).classList.contains('reset-race-btn')) {
      document.location.reload();
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
