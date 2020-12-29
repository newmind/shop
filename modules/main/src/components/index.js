
import hoc from '@ui.packages/hoc';

import Component from './Component';

import { getTypes, getCategories } from '../ducks/commands';


export default hoc({
  onMount({ dispatch }) {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Главная страница`;
    document.querySelector('meta[name="description"]').setAttribute('content', 'Выбор очков, оправ и аксесуаров');

    dispatch(getTypes());
    dispatch(getCategories());
  }
})(Component);
