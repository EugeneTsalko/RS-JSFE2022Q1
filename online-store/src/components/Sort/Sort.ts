import '../Sort/Sort.scss';
import { ROOT_SORT } from '../../constants/root';
import { CATALOG } from '../../constants/catalog';
import { productsPage } from '../Products/Products';

export class Sort {

  sortPriceLow() {
    const renderCatalog = CATALOG;
    renderCatalog.sort((a, b ) => a.price > b.price ? 1 : -1);
    productsPage.render(renderCatalog)
  }

  sortPriceHigh() {
    const renderCatalog = CATALOG;
    renderCatalog.sort((a, b ) => b.price > a.price ? 1 : -1);
    productsPage.render(renderCatalog)
  }

  sortNameA() {
    const renderCatalog = CATALOG;
    renderCatalog.sort((a, b ) => a.name > b.name ? 1 : -1);
    productsPage.render(renderCatalog)
  }

  sortNameZ() {
    const renderCatalog = CATALOG;
    renderCatalog.sort((a, b ) => b.name > a.name ? 1 : -1);
    productsPage.render(renderCatalog)
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
  }




}

export const sortPage = new Sort();