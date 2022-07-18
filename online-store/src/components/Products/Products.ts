// import { CATALOG } from '../../constants/catalog';
import { ROOT_PODUCTS } from '../../constants/root';
import { localStorageUtil } from '../../utils/localStorageUtil';
import { headerPage } from '../Header/Header';
import '../Products/Products.scss';
// import { Product } from '../interfaces';
import { sortPage } from '../Sort/Sort';
import { CATALOG } from '../../constants/catalog';
import { Product } from '../interfaces';

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
    const sortMethod = localStorageUtil.getSort();

    let arr = CATALOG;

    if (localStorageUtil.getMaxPrice()) {
      arr = arr.filter(function(el) { //price filter
        return el.price <= +localStorageUtil.getMaxPrice() && el.price >= +localStorageUtil.getMinPrice()
      });
    }

    if (localStorageUtil.getMaxStrings()) {
      arr = arr.filter(function(el) { //strings filter
        return el.strings <= +localStorageUtil.getMaxStrings() && el.strings >= +localStorageUtil.getMinStrings();
      });
    }

    if (localStorage.brand) {
      arr = arr.filter(function(el) { //brand filter
        return localStorageUtil.getBrand().includes(el.producer.toLowerCase())
      });
    }

    if (localStorage.type) {
      arr = arr.filter(function(el) { //type filter
        return localStorageUtil.getType().includes(el.type.toLowerCase())
      });
    }

    if (localStorage.pickups) {
      arr = arr.filter(function(el) { //pickups filter
        return localStorageUtil.getPickups().includes(el.pickups.toLowerCase())
      });
    }

    if (localStorage.popular) { //popular filter
      arr = arr.filter(item => item.popular === true)
    }

    if (sessionStorage.search) { // search
      if(sessionStorage.search != '')
      arr = arr.filter(item => item.name.toLowerCase().search(sessionStorage.search.toLowerCase()) != -1)
    }
    

    if (!arr.length) {
      alert("Sorry, no matches found.");
    }

    sortPage.render();

    switch(sortMethod) { // sort
      case 'sortPriceLow':
        arr = arr.sort((a, b ) => a.price > b.price ? 1 : -1);
        break;
      case 'sortPriceHigh':
        arr = arr.sort((a, b ) => b.price > a.price ? 1 : -1);
        break;
      case 'sortNameA':
        arr = arr.sort((a, b ) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        break;
      case 'sortNameZ': 
        arr = arr.sort((a, b ) => b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1);
        break;
    }

    let htmlCatalog = '';

    // const renderCatalog = CATALOG;

    arr.forEach(({id, name, price, img, type, strings, pickups, stock}: Product) => {
      let activeClass = '';
      let activeText = '';

      if (productsStore.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeText = this.labelRemove;
        activeClass = ' '+this.classNameActive;
      }

      htmlCatalog += `
        <li class="products-element" data-id="${id}" data-price="${price}">
          <span class="products-element__name" data-id="${id}">${name}</span>
          <img class="products-element__img" src="${img}" data-id="${id}">
          <span>Type: ${type}</span>
          <span>Strings: ${strings}</span>
          <span>Pickups: ${pickups}</span>
          <span>Stock: ${stock}</span>
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