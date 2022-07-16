import '../Sort/Sort.scss';
import { ROOT_SORT } from '../../constants/root';

export class Sort {
  render() {
    const html = `
      <form id="sortForm">
        <label for="sort">Sort by</label>
        <select name="sort" id="sort" class="sort-input">
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    `

    ROOT_SORT.innerHTML = html;
  }
}

export const sortPage = new Sort();