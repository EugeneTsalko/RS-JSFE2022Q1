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
    <div class="form__update-wrapper">
    <input class="input form__car_name" id="update-name" type="text" placeholder="Car name">
    <input class="input form__car_color" id="update-color" type="color" value="#ffffff">
    <button class="button" type="submit" id="update-submit">Update</button>
  </div>
    <button class="button generate-cars-btn" id="generate-cars">Generate random cars</button>
    <div class="form__controls-wrapper">
      <button class="button" id="start-race">Start race</button>
      <button class="button" id="reset-race">Reset race</button>
    </div>
    <div class="pagination">
      <button class="button primary prev-btn" id="prev" disabled>Prev</button>
      <button class="button primary next-btn" id="next" disabled>Next</button>
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
