import { CATALOG } from '../../constants/catalog';
import { ROOT_PODUCTS } from '../../constants/root';
import { localStorageUtil } from '../../utils/localStorageUtil';
import { headerPage } from '../Header/Header';
import '../Products/Products.scss';

export class Products {
  classNameActive: string;
  labelAdd: string;
  labelRemove: string;
  constructor() {
    this.classNameActive = 'products-element__btn_active';
    this.labelAdd = 'ADD TO CART';
    this.labelRemove = 'REMOVE FROM CART';

  }

  handleSetLocationStorage(element: HTMLElement, id: string) {
    if (localStorageUtil.getProducts().length === 20 && !element.classList.contains(this.classNameActive)) {
      alert('Sorry, cart is full.')
    } else {
      const { pushProduct, products } = localStorageUtil.putProducts(id);
      if (pushProduct) {
        element.classList.add(this.classNameActive);
        element.innerHTML = this.labelRemove;
      } else {
        element.classList.remove(this.classNameActive);
        element.innerHTML = this.labelAdd; 
      }
      const headerPageRender = headerPage.render.bind(headerPage);
      headerPageRender(products.length);
    } 
  }

  render() {
    const productsStore = localStorageUtil.getProducts();

    let htmlCatalog = '';

    CATALOG.forEach(({id, name, price, img}) => {
      let activeClass = '';
      let activeText = '';

      if (productsStore.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeText = this.labelRemove;
        activeClass = ' '+this.classNameActive;
      }

      htmlCatalog += `
        <li class="products-element" data-id="${id}">
          <span class="products-element__name" data-id="${id}">${name}</span>
          <img class="products-element__img" src="${img}" data-id="${id}">
          <div class="products-element__price" data-id="${id}">
            <img class="products-element__price-img" src="./assets/img/price.svg" alt="Price" data-id="${id}">
            <span data-id="${id}">${price.toLocaleString()} USD</span>
          </div>
          <button class="products-element__btn${activeClass}" data-id="${id}">
            ${activeText}
          </button>
        </li>
      `;
    });

    const html = `
      <ul class="products-container">
        ${htmlCatalog}
      </ul>
    `;

    ROOT_PODUCTS.innerHTML = html;

    const btns = document.getElementsByClassName("products-element__btn");
    Array.from(btns).forEach(element => element.addEventListener('click', function() {
      const handleSetLocationStorage = productsPage.handleSetLocationStorage.bind(productsPage);
      handleSetLocationStorage(this, element.getAttribute('data-id'))
    }));
  }
}


export const productsPage = new Products();
// productsPage.render();