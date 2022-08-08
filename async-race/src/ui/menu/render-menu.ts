import { insertChilds, NewComponent } from '../../components/new-component';
import './render-menu.scss';

const renderMenu = (): void => {
  const menu = NewComponent('div', ['menu']);
  const garageMenu = NewComponent('button', ['button', 'garage-menu-btn', 'primary'], 'To Garage');
  garageMenu.setAttribute('id', 'garage-menu');
  const winnersMenu = NewComponent('button', ['button', 'winners-menu-btn', 'primary'], 'To Winners');
  garageMenu.setAttribute('id', 'winners-menu');
  insertChilds(menu, [garageMenu, winnersMenu]);

  const formCreate = NewComponent('form', ['form__create-wrapper']);
  formCreate.setAttribute('id', 'create');
  const createName = NewComponent('input', ['input', 'form__car_name']);
  createName.setAttribute('id', 'create-name');
  createName.setAttribute('type', 'text');
  createName.setAttribute('placeholder', 'Car name');
  createName.setAttribute('autocomplete', 'off');
  const createColor = NewComponent('input', ['input', 'form__car_color']);
  createColor.setAttribute('id', 'create-color');
  createColor.setAttribute('type', 'color');
  createColor.setAttribute('value', '#ffffff');
  const createBtn = NewComponent('button', ['button', 'create-btn'], 'Create');
  createBtn.setAttribute('type', 'submit');
  insertChilds(formCreate, [createName, createColor, createBtn]);

  const formUpdate = NewComponent('form', ['form__update-wrapper']);
  formUpdate.setAttribute('id', 'update');
  const updateName = NewComponent('input', ['input', 'form__car_name']);
  updateName.setAttribute('id', 'update-name');
  updateName.setAttribute('type', 'text');
  updateName.setAttribute('placeholder', 'Car name');
  updateName.setAttribute('autocomplete', 'off');
  const updateColor = NewComponent('input', ['input', 'form__car_color']);
  updateColor.setAttribute('id', 'update-color');
  updateColor.setAttribute('type', 'color');
  updateColor.setAttribute('value', '#ff0000');
  const updateBtn = NewComponent('button', ['button', 'update-btn'], 'Update');
  updateBtn.setAttribute('type', 'submit');
  updateBtn.setAttribute('id', 'update-submit');
  insertChilds(formUpdate, [updateName, updateColor, updateBtn]);

  const generateCarsBtn = NewComponent('button', ['button', 'generate-cars-btn'], 'Generate random cars');
  generateCarsBtn.setAttribute('id', 'generate-cars');

  const controlsWrapper = NewComponent('div', ['form__controls-wrapper']);
  const startRaceBtn = NewComponent('button', ['button', 'start-race-btn'], 'Start Race');
  startRaceBtn.setAttribute('id', 'start-race');
  const resetRaceBtn = NewComponent('button', ['button', 'reset-race-btn'], 'Reset Race');
  resetRaceBtn.setAttribute('id', 'reset-race');
  insertChilds(controlsWrapper, [startRaceBtn, resetRaceBtn]);

  const pagination = NewComponent('div', ['pagination']);
  const prevPageBtn = NewComponent('button', ['button', 'prev-btn'], 'Prev Page');
  prevPageBtn.setAttribute('id', 'prev');
  prevPageBtn.setAttribute('disabled', '');
  const nextPageBtn = NewComponent('button', ['button', 'next-btn'], 'Next Page');
  nextPageBtn.setAttribute('id', 'next');

  insertChilds(pagination, [prevPageBtn, nextPageBtn]);

  const garageMenuForm = NewComponent('div', ['form', 'garage-menu']);
  // eslint-disable-next-line max-len
  insertChilds(garageMenuForm, [formCreate, formUpdate, generateCarsBtn, controlsWrapper, pagination]);

  const header = NewComponent('header', ['header']);
  insertChilds(header, [menu, garageMenuForm]);

  document.body.classList.add('body');
  document.body.appendChild(header);
};

export default renderMenu;
