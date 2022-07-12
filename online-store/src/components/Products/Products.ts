import { CATALOG } from '../../constants/catalog';
import { ROOT_PODUCTS } from '../../constants/root';
import '../Products/Products.scss';

export class Products {
  render() {
    let htmlCatalog = '';
    CATALOG.forEach(({name, price, img}) => {
      htmlCatalog += `
        <li class="products-element">
          <span class="products-element__name">${name}</span>
          <img class="products-element__img" src="${img}">
          <div class="products-element__price">
            <img class="products-element__price-img" src="./assets/img/price.svg" alt="Price">
            <span>${price.toLocaleString()} USD</span>
          </div>
          <button class="products-element__btn">ADD TO CART</button>
        </li>
      `;
    });

    const html = `
      <ul class="products-container">
        ${htmlCatalog}
      </ul>
    `;

    ROOT_PODUCTS.innerHTML = html;
  }
}

// const products = new Products();
// products.render();