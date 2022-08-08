import './index.scss';
import { updateStateGarage } from './ui/garage/render-garage';
import render from './ui/render';
import listen from './utils/listen';

render();
await updateStateGarage();
listen();
