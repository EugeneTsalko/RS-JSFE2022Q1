import '../Sort/Sort.scss';
import { ROOT_SORT } from '../../constants/root';
import { productsPage } from '../Products/Products';
import { localStorageUtil } from '../../utils/localStorageUtil';

export class Sort {

  classNameActive: string;
  constructor() {
    this.classNameActive = 'sort-btn_active';
  }

  addClass(element: HTMLElement): void {
    element.classList.add(this.classNameActive);
  }

  sortPriceLow(): void {
    localStorageUtil.setSort('sortPriceLow');
    productsPage.render();
  }

  sortPriceHigh(): void {
    localStorageUtil.setSort('sortPriceHigh');
    productsPage.render();
  }

  sortNameA(): void {
    localStorageUtil.setSort('sortNameA');
    productsPage.render();
  }

  sortNameZ(): void {
    localStorageUtil.setSort('sortNameZ');
    productsPage.render();
  }

  render() {

    const html = `
    <button class="sort-btn" data-sort="price-lowest">price (lowest)</button>
    <button class="sort-btn" data-sort="price-highest">price (highest)</button>
    <button class="sort-btn" data-sort="name-a">name (a-z)</button>
    <button class="sort-btn" data-sort="name-z">name (z-a)</button>
    `;

    ROOT_SORT.innerHTML = html;

    const sortOptionPriceLow = document.querySelector("[data-sort='price-lowest']") as HTMLElement;
    sortOptionPriceLow.addEventListener('click', function(): void {
      const sortPriceLow = sortPage.sortPriceLow.bind(sortPage);
      sortPriceLow();
    });

    const sortOptionPriceHigh = document.querySelector("[data-sort='price-highest']") as HTMLElement;
    sortOptionPriceHigh.addEventListener('click', function(): void {
      const sortPriceHigh = sortPage.sortPriceHigh.bind(sortPage);
      sortPriceHigh();
    });

    const sortOptionNameA = document.querySelector("[data-sort='name-a']") as HTMLElement;
    sortOptionNameA.addEventListener('click', function(): void {
      const sortNameA = sortPage.sortNameA.bind(sortPage);
      sortNameA();
    });

    const sortOptionNameZ = document.querySelector("[data-sort='name-z']") as HTMLElement;
    sortOptionNameZ.addEventListener('click', function(): void {
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