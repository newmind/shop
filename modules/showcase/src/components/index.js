
import HOC from "@ui.packages/hoc";
import { queryToObject } from "@ui.packages/utils";

import Component from './Component';

import { getProducts } from '../ducks/commands';


export default HOC({
  combineEvents: true,
  onMount: ({ dispatch, location }) => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;
    document.querySelector('meta[name="description"]').setAttribute('content', 'Выбор очков, оправ и аксесуаров');

    const query = queryToObject(location['search']);

    dispatch(getProducts(query));
  },
  onUnmount: () => {

  }
})(Component);