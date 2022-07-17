export class LocalStorageUtil {
  keyName: string;
  constructor() {
    this.keyName = 'products';
  }

  // setBrand(arg: string) {
  //   localStorage.setItem('brand', arg);
  // }

  getBrand() {
    if (localStorage.brand) {
      return localStorage.getItem('brand').trim().split(' ');
    } else console.log('brand is empty');
  }

  setPrice(arr: string[]) {
    localStorage.setItem('minPrice', arr[0]);
    localStorage.setItem('maxPrice', arr[1]);
  }

  getMaxPrice() {
    return localStorage.getItem('maxPrice') || 4749;
  }

  getMinPrice() {
    return localStorage.getItem('minPrice') || 239;
  }

  setStrings(arr: string[]) {
    localStorage.setItem('minStrings', arr[0]);
    localStorage.setItem('maxStrings', arr[1]);
  }

  getMaxStrings() {
    return localStorage.getItem('maxStrings') || 7;
  }

  getMinStrings() {
    return localStorage.getItem('minStrings') || 4;
  }

  setSort(opt: string) {
    localStorage.setItem('sort', opt);
  }

  getSort() {
    return localStorage.getItem('sort');
  }

  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }

  putProducts(id: string) {
    const products = this.getProducts();
    let pushProduct = false;
    const index = products.indexOf(id);
    if (index === -1) {
      products.push(id);
      pushProduct = true;
    } else {
      products.splice(index, 1);
    }
    localStorage.setItem(this.keyName, JSON.stringify(products));
    return { pushProduct, products };
  }
}

export const localStorageUtil = new LocalStorageUtil();