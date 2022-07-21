import '../Filters/Filters.scss';
import { ROOT_FILTERS } from '../../constants/root';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { localStorageUtil } from '../../utils/localStorageUtil';
import { productsPage } from '../Products/Products';
import { IElement, InoUiSlider } from '../interfaces';
import { headerPage } from '../Header/Header';

export class Filters {

  searchMethod(el: IElement): void {
    sessionStorage.search = el.value?.trim().toLowerCase();
    productsPage.render()
    window.onbeforeunload = () => sessionStorage.clear();
  }

  filterPopularMethod(): void {
    if(!localStorage.popular) {
      localStorage.popular = 'true';
    } else localStorage.removeItem('popular');
    productsPage.render();
  }

  filterPriceMethod(): void {
    const filterPrice = document.getElementById('filter-price') as InoUiSlider;
    localStorageUtil.setPrice(filterPrice?.noUiSlider.get());
    productsPage.render();
  }

  filterStringsMethod(): void {
    const filterStrings = document.getElementById('filter-strings') as InoUiSlider;
    localStorageUtil.setStrings(filterStrings?.noUiSlider.get());
    productsPage.render();
  }

  filterBrandMethod(element: HTMLInputElement): void {
    if (element.checked === true) {
      if(localStorage.brand) {
        localStorage.brand += ` ${element.id}`;
      } else {
        localStorageUtil.setBrand(` ${element.id}`);
      }
    } else if (!element.checked && localStorageUtil.getBrand()?.length === 1) {
      localStorage.removeItem('brand');
    } else {
      localStorage.brand = localStorage.brand.replace(` ${element.id}`,'');
    }
    productsPage.render();
  }

  filterTypeMethod(element: HTMLInputElement): void {
    if (element.checked === true) {
      if(localStorage.type ) {
        localStorage.type += ` ${element.id}`;
      } else {
        localStorage.type = ` ${element.id}`;
      }
    } else if (!element.checked && localStorageUtil.getType()?.length === 1) {
      localStorage.removeItem('type');
    } else {
      localStorage.type = localStorage.type.replace(` ${element.id}`,'')
    }
    productsPage.render();
  }

  filterPickupsMethod(element: HTMLInputElement): void {
    if (element.checked === true) {
      if(localStorage.pickups) {
        localStorage.pickups += ` ${element.id}`;
      } else {
        localStorage.pickups = ` ${element.id}`;
      }
    } else if (!element.checked && localStorageUtil.getPickups()?.length === 1) {
      localStorage.removeItem('pickups');
    } else {
      localStorage.pickups = localStorage.pickups.replace(` ${element.id}`,'')
    }
    productsPage.render();
  }

  render(): void {

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

    filterPrice.addEventListener('click', function(): void {
      const filterPriceMethod = filtersPage.filterPriceMethod.bind(filtersPage);
      filterPriceMethod();
    });

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

    filterStrings.addEventListener('click', function(): void {
      const filterStringsMethod = filtersPage.filterStringsMethod.bind(filtersPage);
      filterStringsMethod();
    });

    const brands: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-type="brand"]');
    Array.from(brands).forEach(element => element.addEventListener('click', function(): void {
      const filterBrandMethod = filtersPage.filterBrandMethod.bind(filtersPage);
      filterBrandMethod(element);
    }));
    Array.from(brands).forEach(function(el): void {
      if (localStorage.brand && localStorageUtil.getBrand()?.includes(el.id)) {
        el.setAttribute('checked', '');
      }
    });

    const types: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-type="type"]');
    Array.from(types).forEach(element => element.addEventListener('click', function(): void {
      const filterTypeMethod = filtersPage.filterTypeMethod.bind(filtersPage);
      filterTypeMethod(element);
    }));
    Array.from(types).forEach(function(el): void {
      if (localStorage.type && localStorageUtil.getType()?.includes(el.id)) {
        el.setAttribute('checked', '');
      }
    });

    const pickups: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-type="pickups"]');
    Array.from(pickups).forEach(element => element.addEventListener('click', function(): void {
      const filterPickupsMethod = filtersPage.filterPickupsMethod.bind(filtersPage);
      filterPickupsMethod(element);
    }));
    Array.from(pickups).forEach(function(el): void {
      if (localStorage.pickups && localStorageUtil.getPickups()?.includes(el.id)) {
        el.setAttribute('checked', '');
      }
    });

    const popular = document.getElementById('popular') as HTMLElement;
    popular.addEventListener('click', function(): void {
      const filterPopularMethod = filtersPage.filterPopularMethod.bind(filtersPage);
      filterPopularMethod();
    });

    if(localStorage.popular) {
      popular.setAttribute('checked', '');
    }

    const resetFiltersBtn = document.getElementById('reset-filters') as HTMLElement;
    resetFiltersBtn.addEventListener('click', function(): void {
      localStorageUtil.resetFilters();
      sessionStorage.clear();
      filtersPage.render();
      productsPage.render();
    });

    const resetSettingsBtn = document.getElementById('reset-settings') as HTMLElement;
    resetSettingsBtn.addEventListener('click', function(): void{
      localStorage.clear();
      sessionStorage.clear();
      filtersPage.render();
      headerPage.render(0);
      productsPage.render();
    });

    const searchInput = document.getElementById('search') as HTMLElement;
    const searchMethod = filtersPage.searchMethod.bind(filtersPage);
    searchInput.addEventListener('keyup', function(): void {
      searchMethod(searchInput);
    });
    searchInput.addEventListener('click', function(): void{
      searchMethod(searchInput);
    });
    const searchClose = document.getElementById('close') as HTMLElement;
    searchClose.addEventListener('click', function(): void {
      searchMethod(searchInput);
    });
  }
}

export const filtersPage = new Filters();