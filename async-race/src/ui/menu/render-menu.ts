import './render-menu.scss';

const renderMenu = (): void => {
  const html = `
  <div class="menu">
    <button class="button garage-menu-button primary" id="garage-menu">To Garage</button>
    <button class="button winners-menu-button primary" id="winners-menu">To Winners</button>
  </div>
  <div class="garage-menu form">
    <form class="form__create-wrapper" id="create">
      <input class="input form__car_name" id="create-name" type="text" placeholder="Car name" autocomplete="off">
      <input class="input form__car_color" id="create-color" type="color" value="#ffffff">
      <button class="button" type="submit">Create</button>
    </form>
    <form class="form__update-wrapper" id="update">
    <input class="input form__car_name" id="update-name" type="text" placeholder="Car name" autocomplete="off">
    <input class="input form__car_color" id="update-color" type="color" value="#ff0000">
    <button class="button" type="submit" id="update-submit">Update</button>
  </form>
    <button class="button generate-cars-btn" id="generate-cars">Generate random cars</button>
    <div class="form__controls-wrapper">
      <button class="button start-race-btn" id="start-race">Start race</button>
      <button class="button reset-race-btn" id="reset-race">Reset race</button>
    </div>
    <div class="pagination">
      <button class="button primary prev-btn" id="prev" disabled>Prev</button>
      <button class="button primary next-btn" id="next">Next</button>
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
