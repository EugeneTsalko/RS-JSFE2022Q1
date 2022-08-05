import './render-menu.scss';

const renderMenu = (): void => {
  const html = `
  <div class="menu">
    <button class="button garage-menu-button primary" id="garage-menu">To Garage</button>
    <button class="button winners-menu-button primary" id="winners-menu">To Winners</button>
  </div>
  <div class="garage-menu form">
    <div class="form__create-wrapper">
      <input class="input form__car_name" id="create-name" type="text" placeholder="Car name">
      <input class="input form__car_color" id="create-color" type="color" value="#ffffff">
      <button class="button" type="submit">Create</button>
    </div>
    <button class="button" id="generate-cars">Generate random cars</button>
    <div class="form__controls-wrapper">
      <button class="button" id="start-race">Start race</button>
      <button class="button" id="reset-race">Reset race</button>
    </div>
  </div>
  `;
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = html;
  document.body.classList.add('body');
  document.body.appendChild(header);
};

export default renderMenu;
