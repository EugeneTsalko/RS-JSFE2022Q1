import './render.scss';
import renderMenu from './menu/render-menu';
import { renderGarage } from './garage/render-garage';
import { renderWinners } from './winners/render-winners';

const render = async () => {
  renderMenu();
  renderWinners();
  renderGarage();
};

export default render;
