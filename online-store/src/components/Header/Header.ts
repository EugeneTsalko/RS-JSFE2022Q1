import '../Header/Header.scss';
import { ROOT_HEADER } from '../../constants/root';
// import { localStorageUtil } from '../../utils/localStorageUtil';

export class Header {
  render(count: number) {
    const html = `
      <nav class="nav">
        <a href="./index.html" class="nav__logo">Online store</a>
        <ul class="nav__links">
          <li class="nav__links-item">Page 1</li>
          <li class="nav__links-item">Page 2</li>
          <li class="nav__links-item">Page 3</li>
        </ul>
        <button class="nav__cart-button">
          <img src="./assets/img/cart.svg" alt="Cart" class="nav__cart-img">
          <div class="nav__cart-counter">${count}</div>
        </button>
      </nav>
    `
    ROOT_HEADER.innerHTML = html;
  }
}

// const productsStore = localStorageUtil.getProducts();
// productsStore.length