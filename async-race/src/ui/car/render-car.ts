import carSvgImage from '../../assets/svg/carSvgImage';
import { insertChilds, NewComponent } from '../../components/new-component';
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

  const carName = NewComponent('div', ['car-name'], name);

  const carImage = renderCarImage(color);
  carImage.prepend(carName);

  carFragment.appendChild(carImage);

  return carFragment;
};

const renderEditBtns = (id: number): DocumentFragment => {
  const editBtnsFragment = document.createDocumentFragment();

  const editBtns = NewComponent('div', ['edit-btns']);

  const selectBtn = NewComponent('button', ['button', 'select-btn'], 'Select to upd');
  selectBtn.setAttribute('id', `select-car-${id}`);

  const removeBtn = NewComponent('button', ['button', 'remove-btn'], 'Remove');
  removeBtn.setAttribute('id', `remove-car-${id}`);

  insertChilds(editBtns, [selectBtn, removeBtn]);

  editBtnsFragment.appendChild(editBtns);

  return editBtnsFragment;
};

const renderTrack = ({
  id, name, color, isEngine,
}: ICar): DocumentFragment => {
  const trackFragment = document.createDocumentFragment();

  const launchPad = NewComponent('div', ['launch-pad']);

  const controlPanel = NewComponent('div', ['control-panel']);

  const startBtn = NewComponent('button', ['button', 'start-engine-btn'], 'Start');
  startBtn.setAttribute('id', `start-engine-car-${id}`);
  if (isEngine) {
    startBtn.setAttribute('disabled', '');
  }

  const stopBtn = NewComponent('button', ['button', 'stop-engine-btn'], 'Stop');
  stopBtn.setAttribute('id', `stop-engine-car-${id}`);
  if (!isEngine) {
    stopBtn.setAttribute('disabled', '');
  }

  insertChilds(controlPanel, [startBtn, stopBtn]);
  launchPad.appendChild(controlPanel);

  const flag = NewComponent('div', ['flag']);
  flag.setAttribute('id', `flag-${id}`);
  flag.innerHTML = '&#127937';

  const carContainer = NewComponent('div', ['car']);
  carContainer.appendChild(renderCar(name, color));
  (carContainer.lastChild as HTMLElement).setAttribute('id', `car-${id}`);
  carContainer.appendChild(flag);
  launchPad.appendChild(carContainer);

  const editBtns = renderEditBtns(id);

  trackFragment.appendChild(editBtns);
  trackFragment.appendChild(launchPad);

  return trackFragment;
};

export default renderTrack;
