import './render.scss';
import renderMenu from './menu/render-menu';
import renderGarage from './car/render-car';

const render = () => {
  renderMenu();
  renderGarage();
};

export default render;
