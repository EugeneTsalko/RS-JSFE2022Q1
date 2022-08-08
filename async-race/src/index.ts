import './index.scss';
import { updateStateGarage } from './ui/garage/render-garage';
import render from './ui/render';
import listen from './utils/listen';

render();
await updateStateGarage();
listen();

// eslint-disable-next-line no-console
console.log(`
Самооценка 180/190
-Не сделал сортировку в Winners, все остальное реализовано в соответствии с описанием таска.
Возможны мелкие баги не влияющие на оценку.
Если у вас есть вопросы по заданию, пожалуйста, свяжитесь со мной в дискорд. Спасибо!
`);
