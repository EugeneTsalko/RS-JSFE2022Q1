import '../Header/Header.scss';
import { ROOT_HEADER } from '../../constants/root';


export class Header {
  render(count: number): void {
    const html = `
      <nav class="nav">
        <a href="./index.html" class="nav__logo">
          <img class="nav__logo-img" src="../../assets/img/guitar.svg" alt="logo">
          <h1>Guitar Shop</h1>
        </a>
        <ul class="nav__links">
          <li class="nav__links-item">Page 1</li>
          <li class="nav__links-item">Page 2</li>
          <li class="nav__links-item">Page 3</li>
        </ul>
        <button class="nav__cart-button">
          <img src="./assets/img/cart.svg" alt="Cart" class="nav__cart-img">
          <div class="nav__cart-counter"><span>${count}</span></div>
        </button>
      </nav>
    `
    ROOT_HEADER.innerHTML = html;
  }
}

export const headerPage = new Header();