import { insertChilds, NewComponent, setAttributes } from '../../components/new-component';
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
  setAttributes(createName, {
    id: 'create-name', type: 'text', placeholder: 'Car name', autocomplete: 'off',
  });
  const createColor = NewComponent('input', ['input', 'form__car_color']);
  setAttributes(createColor, { id: 'create-color', type: 'color', value: '#ffffff' });
  const createBtn = NewComponent('button', ['button', 'create-btn'], 'Create');
  createBtn.setAttribute('type', 'submit');
  insertChilds(formCreate, [createName, createColor, createBtn]);

  const formUpdate = NewComponent('form', ['form__update-wrapper']);
  formUpdate.setAttribute('id', 'update');
  const updateName = NewComponent('input', ['input', 'form__car_name']);
  setAttributes(updateName, {
    id: 'update-name', type: 'text', placeholder: 'Car name', autocomplete: 'off',
  });
  const updateColor = NewComponent('input', ['input', 'form__car_color']);
  setAttributes(updateColor, { id: 'update-color', type: 'color', value: '#ff0000' });
  const updateBtn = NewComponent('button', ['button', 'update-btn'], 'Update');
  setAttributes(updateBtn, { type: 'sumbit', id: 'update-submit' });
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
  setAttributes(prevPageBtn, { id: 'prev', disabled: '' });
  const nextPageBtn = NewComponent('button', ['button', 'next-btn'], 'Next Page');
  nextPageBtn.setAttribute('id', 'next');

  insertChilds(pagination, [prevPageBtn, nextPageBtn]);

  const garageMenuForm = NewComponent('div', ['form', 'garage-menu']);

  insertChilds(
    garageMenuForm,
    [formCreate, formUpdate, generateCarsBtn, controlsWrapper, pagination],
  );

  const header = NewComponent('header', ['header']);
  insertChilds(header, [menu, garageMenuForm]);

  document.body.classList.add('body');
  document.body.appendChild(header);
};

export default renderMenu;
