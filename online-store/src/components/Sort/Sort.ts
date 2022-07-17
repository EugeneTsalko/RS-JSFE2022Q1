import '../Sort/Sort.scss';
import { ROOT_SORT } from '../../constants/root';
// import { CATALOG } from '../../constants/catalog';
import { productsPage } from '../Products/Products';
import { localStorageUtil } from '../../utils/localStorageUtil';

export class Sort {
  classNameActive: string;
  constructor() {
    this.classNameActive = 'sort-btn_active';
  }

  addClass(element: HTMLElement) {
    element.classList.add(this.classNameActive)
  }

  sortPriceLow() {
    // const renderCatalog = CATALOG;
    // arr = arr.sort((a, b ) => a.price > b.price ? 1 : -1);
    // return arr;
    localStorageUtil.setSort('sortPriceLow');
    productsPage.render();
  }

  sortPriceHigh() {
    // const renderCatalog = CATALOG;
    // renderCatalog.sort((a, b ) => b.price > a.price ? 1 : -1);
    localStorageUtil.setSort('sortPriceHigh');
    productsPage.render();
  }

  sortNameA() {
    // const renderCatalog = CATALOG;
    // renderCatalog.sort((a, b ) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    localStorageUtil.setSort('sortNameA');
    productsPage.render();
  }

  sortNameZ() {
    // const renderCatalog = CATALOG;
    // renderCatalog.sort((a, b ) => b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1);
    localStorageUtil.setSort('sortNameZ');
    productsPage.render();
  }

  render() {
    // const html = `
    //   <form id="sortForm">
    //     <label for="sort">Sort by</label>
    //     <select name="sort" id="sort" class="sort-input">
    //       <option value="price-lowest">price (lowest)</option>
    //       <option value="price-highest">price (highest)</option>
    //       <option value="name-a">name (a-z)</option>
    //       <option value="name-z">name (z-a)</option>
    //     </select>
    //   </form>
    // `

    const html = `
    <button class="sort-btn" data-sort="price-lowest">price (lowest)</button>
    <button class="sort-btn" data-sort="price-highest">price (highest)</button>
    <button class="sort-btn" data-sort="name-a">name (a-z)</button>
    <button class="sort-btn" data-sort="name-z">name (z-a)</button>
    `

    ROOT_SORT.innerHTML = html;

    const sortOptionPriceLow = document.querySelector("[data-sort='price-lowest']");
    sortOptionPriceLow.addEventListener('click', function() {
      const sortPriceLow = sortPage.sortPriceLow.bind(sortPage);
      sortPriceLow();
    });

    const sortOptionPriceHigh = document.querySelector("[data-sort='price-highest']");
    sortOptionPriceHigh.addEventListener('click', function() {
      const sortPriceHigh = sortPage.sortPriceHigh.bind(sortPage);
      sortPriceHigh();
    });

    const sortOptionNameA = document.querySelector("[data-sort='name-a']");
    sortOptionNameA.addEventListener('click', function() {
      const sortNameA = sortPage.sortNameA.bind(sortPage);
      sortNameA();
    });

    const sortOptionNameZ = document.querySelector("[data-sort='name-z']");
    sortOptionNameZ.addEventListener('click', function() {
      const sortNameZ = sortPage.sortNameZ.bind(sortPage);
      sortNameZ();
    });

    const sortMethod = localStorageUtil.getSort();

    switch(sortMethod) {
      case 'sortPriceLow':
        sortOptionPriceLow.classList.add(this.classNameActive);
        break;
      case 'sortPriceHigh':
        sortOptionPriceHigh.classList.add(this.classNameActive);
        break;
      case 'sortNameA':
        sortOptionNameA.classList.add(this.classNameActive);
        break;
      case 'sortNameZ': 
      sortOptionNameZ.classList.add(this.classNameActive);
        break;
    }

    
  }

}

export const sortPage = new Sort();