import '../Filters/Filters.scss';
import { ROOT_FILTERS } from '../../constants/root';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { localStorageUtil } from '../../utils/localStorageUtil';
// import { CATALOG } from '../../constants/catalog';
// import { Product } from '../interfaces';
import { productsPage } from '../Products/Products';

export class Filters {

  // searchMethod(el: { value: string; }) {
  //   const val = el.value.trim().toLowerCase();
  //   const products = document.querySelectorAll('.products-element__name');
  //   if (val != '') {
  //     products.forEach(function(elem) {
  //       if(elem.innerHTML.toLowerCase().search(val) == -1) {
  //         elem.parentElement.classList.add('hide');
  //       } else {
  //         elem.parentElement.classList.remove('hide');
  //       }
  //     })
  //   } else{
  //     products.forEach(function(elem) {
  //         elem.parentElement.classList.remove('hide');
  //     })
  //   }
  // }

  searchMethod(el: { value: string; }) {
    sessionStorage.search = el.value.trim().toLowerCase();
    productsPage.render()
    window.onbeforeunload = () => sessionStorage.clear();
  }

  filterPopularMethod() {
    if(!localStorage.popular) {
      localStorage.popular = 'true';
    } else localStorage.removeItem('popular');
    productsPage.render();
  }

  filterPriceMethod(element: { noUiSlider: { get: () => string[]; }; }): void {
    localStorageUtil.setPrice(element.noUiSlider.get());
    // let renderCatalog: Product[] = CATALOG;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // renderCatalog = renderCatalog.filter(function(el) {
    //   return el.price <= +localStorageUtil.getMaxPrice() && el.price >= +localStorageUtil.getMinPrice();
    // });
    productsPage.render();
  }

  filterStringsMethod(element: { noUiSlider: { get: () => string[]; }; }): void {
    localStorageUtil.setStrings(element.noUiSlider.get());
    productsPage.render();
  }

  filterBrandMethod(element: HTMLInputElement) {
    if (element.checked === true) {
      if(localStorage.brand) {
        localStorage.brand += ` ${element.id}`;
      } else {
        localStorage.brand = ` ${element.id}`;
      }
    } else if (!element.checked && localStorageUtil.getBrand().length === 1) {
      localStorage.removeItem('brand');
    } else {
      localStorage.brand = localStorage.brand.replace(` ${element.id}`,'')
    }
    // console.log(localStorageUtil.getBrand())
    productsPage.render();
  }

  filterTypeMethod(element: HTMLInputElement) {
    if (element.checked === true) {
      if(localStorage.type) {
        localStorage.type += ` ${element.id}`;
      } else {
        localStorage.type = ` ${element.id}`;
      }
    } else if (!element.checked && localStorageUtil.getType().length === 1) {
      localStorage.removeItem('type');
    } else {
      localStorage.type = localStorage.type.replace(` ${element.id}`,'')
    }
    productsPage.render();
  }

  filterPickupsMethod(element: HTMLInputElement) {
    if (element.checked === true) {
      if(localStorage.pickups) {
        localStorage.pickups += ` ${element.id}`;
      } else {
        localStorage.pickups = ` ${element.id}`;
      }
    } else if (!element.checked && localStorageUtil.getPickups().length === 1) {
      localStorage.removeItem('pickups');
    } else {
      localStorage.pickups = localStorage.pickups.replace(` ${element.id}`,'')
    }
    productsPage.render();
  }

  render() {

    const html = `
    <div class="search-container">
    <input type="text" id="search" placeholder="search" class="search-input" autocomplete="off" value="" autofocus>
    <span class="search-input_close" id="close" onclick="this.previousElementSibling.value = ''">
    &times;
    </span>
    </div>
    <div class="range-filters">
        <span>Price:</span>
        <div id="filter-price">
        </div>
        <span>Strings:</span>
        <div id="filter-strings">
        </div>
    </div>

    <div class="value-filters">
        <fieldset>
            <legend>Brand:</legend>
                <input type="checkbox" id="fender" name="fender" data-type="brand">
                <label for="fender">Fender</label>
                <input type="checkbox" id="esp" name="esp" data-type="brand">
                <label for="esp">ESP</label>
                <input type="checkbox" id="gibson" name="gibson" data-type="brand">
                <label for="gibson">Gibson</label>
                <input type="checkbox" id="epiphone" name="epiphone" data-type="brand">
                <label for="epiphone">Epiphone</label>
        </fieldset>
        <fieldset>
            <legend>Type:</legend>
                <input type="checkbox" id="electro" name="electro" data-type="type">
                <label for="electro">Electro</label>
                <input type="checkbox" id="bass" name="bass" data-type="type">
                <label for="bass">Bass</label>
                <input type="checkbox" id="acoustic" name="acoustic" data-type="type">
                <label for="acoustic">Acoustic</label>
        </fieldset>
        <fieldset>
        <legend>Sound pickups set:</legend>
            <input type="checkbox" id="s-s-s" name="s-s-s" data-type="pickups">
            <label for="s-s-s">S-S-S</label>
            <input type="checkbox" id="h-h" name="h-h" data-type="pickups">
            <label for="h-h">H-H</label>
            <input type="checkbox" id="s-s" name="s-s" data-type="pickups">
            <label for="s-s">S-S</label>
            <input type="checkbox" id="s-h" name="s-h" data-type="pickups">
            <label for="s-h">S-H</label>
            <input type="checkbox" id="h" name="h" data-type="pickups">
            <label for="h">H</label>
            <input type="checkbox" id="none" name="none" data-type="pickups">
            <label for="none">None</label>
    </fieldset>
        <fieldset>
            <legend>Popularity:</legend>
            <input type="checkbox" id="popular" name="popular">
            <label for="popular">Popular</label>
        </fieldset>
    </div>
    <div class="reset-buttons">
      <button id="reset-filters">Reset filters</button>
      <button id="reset-settings">Reset all settings</button>

    </div>
    `
    ROOT_FILTERS.innerHTML = html;

    const filterPrice = document.getElementById('filter-price') as noUiSlider.target;

    // filterPrice.noUiSlider.set([2000, 2500]);
    // const filterPriceSet = filterPrice.noUiSlider.set.bind(filterPrice);
    // filterPriceSet([2000,4000])

    noUiSlider.create(filterPrice, {
      start: [239, 4749],
      step: 1,
      connect: true,
      tooltips: [true, true],
      range: {
          'min': 239,
          'max': 4749
      }
    });

    filterPrice.addEventListener('click', function(){
      // console.log(filterPrice.noUiSlider.get());
      const filterPriceMethod = filtersPage.filterPriceMethod.bind(filtersPage);
      filterPriceMethod(filterPrice);
    })

    const filterStrings = document.getElementById('filter-strings') as noUiSlider.target;

    noUiSlider.create(filterStrings, {
      start: [4, 7],
      step: 1,
      connect: true,
      tooltips: [true, true],
      range: {
          'min': 4,
          'max': 7
      }
    });

    filterStrings.addEventListener('click', function(){
      // console.log(filterPrice.noUiSlider.get());
      const filterStringsMethod = filtersPage.filterStringsMethod.bind(filtersPage);
      filterStringsMethod(filterStrings);
    })

    const brands: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-type="brand"]');
    Array.from(brands).forEach(element => element.addEventListener('click', function() {
      const filterBrandMethod = filtersPage.filterBrandMethod.bind(filtersPage);
      filterBrandMethod(element);
    }));
    Array.from(brands).forEach(function(el) {
      if (localStorage.brand && localStorageUtil.getBrand().includes(el.id)) {
        el.setAttribute('checked', '');
      }
    });

    const types: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-type="type"]');
    Array.from(types).forEach(element => element.addEventListener('click', function() {
      const filterTypeMethod = filtersPage.filterTypeMethod.bind(filtersPage);
      filterTypeMethod(element);
    }));
    Array.from(types).forEach(function(el) {
      if (localStorage.type && localStorageUtil.getType().includes(el.id)) {
        el.setAttribute('checked', '');
      }
    });

    const pickups: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-type="pickups"]');
    Array.from(pickups).forEach(element => element.addEventListener('click', function() {
      const filterPickupsMethod = filtersPage.filterPickupsMethod.bind(filtersPage);
      filterPickupsMethod(element);
    }));
    Array.from(pickups).forEach(function(el) {
      if (localStorage.pickups && localStorageUtil.getPickups().includes(el.id)) {
        el.setAttribute('checked', '');
      }
    });

    const popular: HTMLElement = document.getElementById('popular');
    popular.addEventListener('click', function() {
      const filterPopularMethod = filtersPage.filterPopularMethod.bind(filtersPage);
      filterPopularMethod();
    })
    if(localStorage.popular) {
      popular.setAttribute('checked', '');
    }

    const resetFiltersBtn = document.getElementById('reset-filters');
    resetFiltersBtn.addEventListener('click', function(){
      localStorageUtil.resetFilters();
      filtersPage.render();
      productsPage.render();
    })

    const resetSettingsBtn = document.getElementById('reset-settings');
    resetSettingsBtn.addEventListener('click', function(){
      localStorage.clear();
      filtersPage.render();
      productsPage.render();
    })

    const searchInput = document.getElementById('search');
    const searchMethod = filtersPage.searchMethod.bind(filtersPage);
    searchInput.addEventListener('keyup', function(){
      searchMethod(searchInput);
    })
    searchInput.addEventListener('click', function(){
      searchMethod(searchInput);
    })
    const searchClose = document.getElementById('close');
    searchClose.addEventListener('click', function(){
      searchMethod(searchInput);
    });
  }
}

export const filtersPage = new Filters();