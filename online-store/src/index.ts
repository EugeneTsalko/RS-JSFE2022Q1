import './styles.scss';

import * as noUiSlider from 'nouislider';
import { productsPage } from './components/Products/Products';
import { headerPage } from './components/Header/Header';
import { localStorageUtil } from './utils/localStorageUtil';
import { filtersPage } from './components/Filters/Filters';


productsPage.render();


const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);

filtersPage.render();

const filterPrice = document.getElementById('filter-price') as noUiSlider.target;
filterPrice.noUiSlider?.set([+localStorageUtil.getMinPrice(), +localStorageUtil.getMaxPrice()]);
const filterStrings = document.getElementById('filter-strings') as noUiSlider.target;
filterStrings.noUiSlider?.set([+localStorageUtil.getMinStrings(), +localStorageUtil.getMaxStrings()]);
