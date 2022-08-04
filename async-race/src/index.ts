import './index.scss';
import { renderMenu, renderCar } from './ui/render';

renderMenu();

document.body.appendChild(renderCar('ZAZ 968m', '#fff'));
