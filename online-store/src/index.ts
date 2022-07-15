import './styles.scss';


import { Products } from './components/Products/Products';
// import { productsPage } from './components/Products/Products';
// // import { localStorageUtil } from './utils/localStorageUtil';

// const productsPage = new Products();
// productsPage.render();
// @ts-ignore
window.productsPage = new Products();
// @ts-ignore
window.productsPage.render();


// console.log(productsPage.handleSetLocationStorage)



