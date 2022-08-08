/* eslint-disable linebreak-style */
import { WINNERS_CARS_LIMIT } from '../../api/constants-api';
import state from '../../api/state';
import { getWinners } from '../../api/winners-api';
import { insertChilds, NewComponent } from '../../components/new-component';
import { renderCarImage } from '../car/render-car';
// import { renderCarImage } from '../car/render-car';
import './render-winners.scss';

export const renderWinners = () => {
  const h1 = NewComponent('h1', ['winners-header'], `Winners (${state.winnersCount})`);
  const h2 = NewComponent('h2', ['winners-page-num'], `Page #${state.winnersPage}`);
  const table = NewComponent('table', ['table']);

  const thead = NewComponent('thead', ['thead']);
  const thNum = NewComponent('th', ['th-number'], '#');
  const thCar = NewComponent('th', ['th-car'], 'Car');
  const thName = NewComponent('th', ['th-name'], 'Name');
  const thWins = NewComponent('th', ['th-wins'], 'Wins');
  thWins.setAttribute('id', 'wins');
  const thTime = NewComponent('th', ['th-time'], 'Best Time (s)');
  thTime.setAttribute('id', 'time');
  insertChilds(thead, [thNum, thCar, thName, thWins, thTime]);

  const tbody = NewComponent('tbody', ['tbody']);
  state.winners.forEach((winner, i) => {
    const tr = NewComponent('tr', ['tr']);
    const tdNum = NewComponent('td', ['td-number'], `${i + 1}`);
    const tdCar = NewComponent('td', ['td-car']);
    const carImg = renderCarImage(winner.car.color);
    tdCar.appendChild(carImg);
    const tdName = NewComponent('td', ['td-name'], `${winner.car.name}`);
    const tdWins = NewComponent('td', ['td-wins'], `${winner.wins}`);
    const tdTime = NewComponent('td', ['td-time'], `${winner.time}`);
    insertChilds(tr, [tdNum, tdCar, tdName, tdWins, tdTime]);
    tbody.appendChild(tr);
  });

  insertChilds(table, [thead, tbody]);

  const winnersView = NewComponent('div', ['hidden']);
  winnersView.setAttribute('id', 'winners-view');
  insertChilds(winnersView, [h1, h2, table]);

  document.body.appendChild(winnersView);
};

export const updateStateWinners = async () => {
  const { items, count } = await getWinners({ page: state.winnersPage });
  state.winners = items;
  state.winnersCount = count;

  if (state.winnersPage * WINNERS_CARS_LIMIT < +state.winnersCount) {
    (document.getElementById('next') as HTMLButtonElement).disabled = false;
  } else {
    (document.getElementById('next') as HTMLButtonElement).disabled = true;
  }

  if (state.winnersPage > 1) {
    (document.getElementById('prev') as HTMLButtonElement).disabled = false;
  } else {
    (document.getElementById('prev') as HTMLButtonElement).disabled = true;
  }
};
