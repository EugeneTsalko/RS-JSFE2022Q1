// import './render.scss';
// import carSvgImage from '../assets/svg/carSvgImage';
// import { ISvg } from '../interfaces/interfaces';
// import NewComponent from '../components/new-component';

// const renderCar = (name: string, color: string): DocumentFragment => {
//   const carFragment = document.createDocumentFragment();
//   const carName = new NewComponent(['car-name'], name);
//   const carImage = document.createElement('svg') as ISvg;
//   carImage.style.fill = color;
//   carImage.innerHTML = carSvgImage;
//   carImage.classList.add('car-svg');
//   const carContainer = new NewComponent(['car-container']);
//   carContainer.insertChild(carName);
//   carContainer.getNode().appendChild(carImage);
//   carFragment.appendChild(carContainer.getNode());
//   return carFragment;
// };

// export const renderTrack = ({ id, name, color, isEngine }) => {
// export const renderTrack = (name: string, color: string): DocumentFragment => {
//   const trackFragment = document.createDocumentFragment();
//   const editBtns = new NewComponent(['edit-btns']);
//   const selectBtn = new NewComponent(['button', 'select-btn'], 'Select', 'button');
//   const removeBtn = new NewComponent(['button', 'remove-btn'], 'Remove', 'button');
//   editBtns.insertChilds([selectBtn, removeBtn]);
//   trackFragment.appendChild(editBtns.getNode());
//   const track = new NewComponent(['track']);
//   const launchBtns = new NewComponent(['launch-btns']);
//   const startBtn = new NewComponent(['button', 'start-btn'], 'Start', 'button');
//   const stopBtn = new NewComponent(['button', 'stop-btn'], 'Stop', 'button');
//   launchBtns.insertChilds([startBtn, stopBtn]);
//   track.insertChild(launchBtns);
//   const car = renderCar(name, color);
//   const flag = new NewComponent(['flag']);
//   track.getNode().appendChild(car);
//   track.insertChild(flag);
//   trackFragment.appendChild(track.getNode());
//   return trackFragment;
// };

// const renderTrack = (
//   {
//     id, name, color, isEngine,
//   }: { id: number, name: string, color: string, isEngine: boolean },
// ) => `
// `;
