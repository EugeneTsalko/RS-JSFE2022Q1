import './render.scss';
import carSvgImage from '../assets/svg/carSvgImage';
import { ISvg } from '../interfaces/interfaces';

export const renderMenu = (): void => {
  const html = `
  <div class="menu">
    <button class="button" id="garage-menu">To Garage</button>
    <button class="button" id="winners-menu">To Winners</button>
  </div>
  <div class="garage-menu form">
    <div class="form__create-wrapper">
      <input class="input form__car_name" id="create-name" type="text" placeholder="Car name">
      <input class="input form__car_color" id="create-color" type="color" value="#ffffff">
      <button class="button" type="submit">Create</button>
    </div>
    <button class="button" id="generate-cars">Generate random cars</button>
    <div class="form__controls-wrapper">
      <button class="button" id="start-race">Start race</button>
      <button class="button" id="reset-race">Reset race</button>
    </div>
  </div>
  `;
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = html;
  document.body.classList.add('body');
  document.body.appendChild(header);
};

export const renderCar = (name: string, color: string): DocumentFragment => {
  const carFragment = document.createDocumentFragment();
  const carName = document.createElement('span');
  carName.classList.add('car-name');
  carName.innerHTML = name;
  const carImage = document.createElement('svg') as ISvg;
  carImage.style.fill = color;
  carImage.innerHTML = carSvgImage;
  carImage.classList.add('car-svg');
  carFragment.appendChild(carName);
  carFragment.appendChild(carImage);
  return carFragment;
};
