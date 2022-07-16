import '../Filters/Filters.scss';
import { ROOT_FILTERS } from '../../constants/root';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { localStorageUtil } from '../../utils/localStorageUtil';

export class Filters {

  filterPriceMethod(element: { noUiSlider: { get: () => string[]; }; }): void {
    localStorageUtil.setPrice(element.noUiSlider.get());
  }

  render() {

    const html = `
    <input type="text" name="text" placeholder="search" class="search-input" value="">

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
                <input type="checkbox" id="fender" name="fender">
                <label for="fender">Fender</label>
                <input type="checkbox" id="esp" name="esp">
                <label for="esp">ESP</label>
                <input type="checkbox" id="gibson" name="gibson">
                <label for="gibson">Gibson</label>
                <input type="checkbox" id="epiphone" name="epiphone">
                <label for="epiphone">Epiphone</label>
        </fieldset>
        <fieldset>
            <legend>Type:</legend>
                <input type="checkbox" id="electro" name="electro">
                <label for="electro">Electro</label>
                <input type="checkbox" id="bass" name="bass">
                <label for="bass">Bass</label>
                <input type="checkbox" id="acoustic" name="acoustic">
                <label for="acoustic">Acoustic</label>
        </fieldset>
        <fieldset>
            <legend>Popularity:</legend>
            <input type="checkbox" id="popular" name="popular">
            <label for="popular">Popular</label>
        </fieldset>
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
    
  }
}

export const filtersPage = new Filters();