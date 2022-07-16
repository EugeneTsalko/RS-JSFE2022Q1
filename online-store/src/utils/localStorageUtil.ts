export class LocalStorageUtil {
  keyName: string;
  constructor() {
    this.keyName = 'products';
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