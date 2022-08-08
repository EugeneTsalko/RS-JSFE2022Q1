/* eslint-disable linebreak-style */
import {
  createCar, deleteCar, getCar, updateCar,
} from '../api/car-api';
import state from '../api/state';
import { deleteWinner, saveWinner } from '../api/winners-api';
import { ICar } from '../interfaces/interfaces';
import { renderGarage, updateStateGarage } from '../ui/garage/render-garage';
import { renderWinners, updateStateWinners } from '../ui/winners/render-winners';
import {
  getRandomCarsArr, race, startDriving, stopDriving,
} from './utils';

let selectedCar: ICar = null;

const listen = () => {
  document.body.addEventListener('click', async (event) => {
    const fullId = (event.target as HTMLElement).id.split('-');
    const id = +fullId[fullId.length - 1];

    if ((event.target as HTMLElement).classList.contains('garage-menu-btn')) {
      await updateStateGarage();
      (document.getElementById('winners-view') as HTMLElement).classList.add('hidden');
      (document.getElementById('garage-container') as HTMLElement).classList.remove('hidden');
      (document.getElementById('create-submit') as HTMLButtonElement).disabled = false;
      (document.getElementById('update-submit') as HTMLButtonElement).disabled = false;
      (document.getElementById('generate-cars') as HTMLButtonElement).disabled = false;
      (document.getElementById('start-race') as HTMLButtonElement).disabled = false;
      (document.getElementById('reset-race') as HTMLButtonElement).disabled = false;
    }

    if ((event.target as HTMLElement).classList.contains('winners-menu-btn')) {
      await updateStateWinners();
      (document.getElementById('garage-container') as HTMLElement).classList.add('hidden');
      (document.getElementById('winners-view') as HTMLElement).classList.remove('hidden');
      (document.getElementById('create-submit') as HTMLButtonElement).disabled = true;
      (document.getElementById('update-submit') as HTMLButtonElement).disabled = true;
      (document.getElementById('generate-cars') as HTMLButtonElement).disabled = true;
      (document.getElementById('start-race') as HTMLButtonElement).disabled = true;
      (document.getElementById('reset-race') as HTMLButtonElement).disabled = true;
    }

    if ((event.target as HTMLElement).classList.contains('select-btn')) {
      (document.getElementById(`select-car-${id}`) as HTMLInputElement).classList.toggle('select-btn_active');
      selectedCar = await getCar(id);
      (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
      (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
    }

    if ((event.target as HTMLElement).classList.contains('remove-btn')) {
      await deleteCar(id);
      await deleteWinner(id);
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
      const garageView = document.getElementById('garage-container') as HTMLElement;
      if (!garageView.classList.contains('hidden')) {
        state.carsPage += 1;
        await updateStateGarage();
        document.getElementById('garage-container').remove();
        renderGarage();
      } else {
        state.winnersPage += 1;
        await updateStateWinners();
        document.getElementById('winners-view').remove();
        renderWinners();
        (document.getElementById('winners-view') as HTMLElement).classList.remove('hidden');
      }
    }

    if ((event.target as HTMLElement).classList.contains('prev-btn')) {
      const garageView = document.getElementById('garage-container') as HTMLElement;
      if (!garageView.classList.contains('hidden')) {
        state.carsPage -= 1;
        await updateStateGarage();
        document.getElementById('garage-container').remove();
        renderGarage();
      } else {
        state.winnersPage -= 1;
        await updateStateWinners();
        document.getElementById('winners-view').remove();
        renderWinners();
        (document.getElementById('winners-view') as HTMLElement).classList.remove('hidden');
      }
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
      await saveWinner({ id: winner.id, time: winner.time });
      // eslint-disable-next-line no-alert
      alert(`winner: ${winner.name}, time: ${winner.time}
      click Reset before new race, please`);
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
