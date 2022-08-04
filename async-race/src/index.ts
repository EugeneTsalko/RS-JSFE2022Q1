import './index.scss';
import renderMenu from './ui/menu/render-menu';
import renderCarImage from './ui/car/render-car';
// import { renderMenu, renderTrack } from './ui/render';

renderMenu();

document.body.appendChild(renderCarImage('#fff'));

// document.body.appendChild(renderTrack('ZAZ 968m', '#fff'));
