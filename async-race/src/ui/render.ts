import './render.scss';
import renderMenu from './menu/render-menu';
import { renderGarage } from './garage/render-garage';

const render = () => {
  renderMenu();
  renderGarage();
};

export default render;
