/* eslint-disable linebreak-style */
import { deleteCar, getCar } from '../api/car-api';
import { ICar } from '../interfaces/interfaces';
import renderGarage, { updateStateGarage } from '../ui/car/render-car';

let selectedCar: ICar = null;

const listen = () => {
  document.body.addEventListener('click', async (event) => {
    // eslint-disable-next-line no-console
    console.log((event.target as HTMLElement));
    const fullId = (event.target as HTMLElement).id;
    const id = +fullId.charAt(fullId.length - 1);

    if ((event.target as HTMLElement).classList.contains('select-btn')) {
      selectedCar = await getCar(id);
      // console.log(selectedCar);
      (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
      (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
    }

    if ((event.target as HTMLElement).classList.contains('remove-btn')) {
      await deleteCar(id);
      await updateStateGarage();
      // document.body.insertAdjacentElement('');
      document.getElementById('garage-container').remove();
      renderGarage();
    }
  });
};

export default listen;
