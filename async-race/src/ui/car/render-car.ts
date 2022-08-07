// import { getCar, getCars } from '../../api/car-api';
// import state from '../../api/state';
import { getCars } from '../../api/car-api';
// import { GARAGE_CARS_LIMIT } from '../../api/constants-api';
import state from '../../api/state';
import carSvgImage from '../../assets/svg/carSvgImage';
import { ICar, ISvg } from '../../interfaces/interfaces';
import './render-car.scss';

const renderCarImage = (color: string): ISvg => {
  const carImage = document.createElement('svg') as ISvg;
  carImage.style.fill = color;
  carImage.innerHTML = carSvgImage;
  carImage.classList.add('car-svg');

  return carImage;
};

const renderCar = (name: string, color: string): DocumentFragment => {
  const carFragment = document.createDocumentFragment();

  const carName = document.createElement('div');
  carName.innerText = name;
  carName.classList.add('car-name');

  const carImage = renderCarImage(color);
  carImage.prepend(carName);

  carFragment.appendChild(carImage);

  return carFragment;
};

const renderEditBtns = (id: number): DocumentFragment => {
  const editBtnsFragment = document.createDocumentFragment();

  const editBtns = document.createElement('div');
  editBtns.classList.add('edit-btns');

  const selectBtn = document.createElement('button');
  selectBtn.innerText = 'Select';
  selectBtn.classList.add('button');
  selectBtn.classList.add('select-btn');
  selectBtn.setAttribute('id', `select-car-${id}`);

  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';
  removeBtn.classList.add('button');
  removeBtn.classList.add('remove-btn');
  removeBtn.setAttribute('id', `remove-car-${id}`);

  editBtns.appendChild(selectBtn);
  editBtns.appendChild(removeBtn);

  editBtnsFragment.appendChild(editBtns);

  return editBtnsFragment;
};

const renderTrack = ({
  id, name, color, isEngine,
}: ICar): DocumentFragment => {
  const trackFragment = document.createDocumentFragment(); // fragment

  const launchPad = document.createElement('div');
  launchPad.classList.add('launch-pad');

  const controlPanel = document.createElement('div');
  controlPanel.classList.add('control-panel');

  const startBtn = document.createElement('button');
  startBtn.innerText = 'Start';
  startBtn.classList.add('button');
  startBtn.classList.add('start-engine-btn');
  startBtn.setAttribute('id', `start-engine-car-${id}`);
  if (isEngine) {
    startBtn.setAttribute('disabled', '');
  }

  const stopBtn = document.createElement('button');
  stopBtn.innerText = 'Stop';
  stopBtn.classList.add('button');
  stopBtn.classList.add('stop-engine-button');
  stopBtn.setAttribute('id', `stop-engine-car-${id}`);
  // if (!isEngine) {
  //   stopBtn.setAttribute('disabled', '');
  // }

  controlPanel.appendChild(startBtn);
  controlPanel.appendChild(stopBtn);
  launchPad.appendChild(controlPanel);

  const flag = document.createElement('div');
  flag.classList.add('flag');
  flag.setAttribute('id', `flag-${id}`);
  flag.innerHTML = '&#127937'; // flag html code

  const carContainer = document.createElement('div');
  carContainer.classList.add('car');
  // carContainer.setAttribute('id', `car-${id}`);
  carContainer.appendChild(renderCar(name, color));
  (carContainer.lastChild as HTMLElement).setAttribute('id', `car-${id}`);
  carContainer.appendChild(flag);
  launchPad.appendChild(carContainer);

  const editBtns = renderEditBtns(id);

  trackFragment.appendChild(editBtns);
  trackFragment.appendChild(launchPad);

  return trackFragment;
};

const renderGarage = () => {
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

  // return garageFragment;
};

export default renderGarage;

export const updateStateGarage = async () => {
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
