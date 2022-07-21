export class LocalStorageUtil {

  keyName: string;
  constructor() {
    this.keyName = 'products';
  }

  resetFilters(): void {
    const keys: string[] = Object.keys(localStorage);
    if(keys.length) {
      for(let i = 0; i < keys.length; i++) {
        if (keys[i] !== 'sort' && keys[i] !== 'products') {
        localStorage.removeItem(keys[i]);
        }
      }
    }
  }

  setBrand(opt: string): void {
    localStorage.setItem('brand', opt);
  }

  getBrand(): string[] | undefined {
    if (localStorage.brand) {
      return localStorage.getItem('brand')?.trim().split(' ');
    }
  }

  getType(): string[] | undefined {
    if (localStorage.type) {
      return localStorage.getItem('type')?.trim().split(' ');
    } 
  }

  getPickups(): string[] | undefined {
    if (localStorage.pickups) {
      return localStorage.getItem('pickups')?.trim().split(' ');
    } 
  }

  setPrice(arr: string[]): void {
    localStorage.setItem('minPrice', arr[0]);
    localStorage.setItem('maxPrice', arr[1]);
  }

  getMaxPrice(): string | number {
    return localStorage.getItem('maxPrice') || 4749;
  }

  getMinPrice(): string | number  {
    return localStorage.getItem('minPrice') || 239;
  }

  setStrings(arr: string[]): void {
    localStorage.setItem('minStrings', arr[0]);
    localStorage.setItem('maxStrings', arr[1]);
  }

  getMaxStrings(): string | number  {
    return localStorage.getItem('maxStrings') || 7;
  }

  getMinStrings(): string | number  {
    return localStorage.getItem('minStrings') || 4;
  }

  setSort(opt: string): void {
    localStorage.setItem('sort', opt);
  }

  getSort(): string {
    return localStorage.getItem('sort') as string;
  }

  getProducts(): string[] {
    const productsLocalStorage = localStorage.getItem(this.keyName) as string;
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