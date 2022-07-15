import './styles.scss';


// import { Products } from './components/Products/Products';
// import { Header } from './components/Header/Header';
import { productsPage } from './components/Products/Products';
import { headerPage } from './components/Header/Header';
import { localStorageUtil } from './utils/localStorageUtil';

// const productsPage = new Products();
productsPage.render();


// const headerPage = new Header();
const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);

// // @ts-ignore
// window.productsPage = new Products();
// // @ts-ignore
// window.productsPage.render();

// // @ts-ignore
// window.headerPage = new Header();
// const productsStore = localStorageUtil.getProducts();
// // @ts-ignore
// window.headerPage.render(productsStore.length);



// console.log(productsPage.handleSetLocationStorage)



