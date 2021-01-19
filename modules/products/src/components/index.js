
import HOC from '@ui.packages/hoc';
import { queryToObject } from "@ui.packages/utils";

import Component from './Component';

import { resetState } from '../ducks/slice';
import { getProducts } from '../ducks/commands';


export default HOC({
  combineEvents: true,
  onMount({ dispatch, location }) {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Товар`;
    document.querySelector('meta[name="description"]').setAttribute('content', '');

    const query = queryToObject(location['search']);

    dispatch(getProducts(query));
  },
  onUnmount({ dispatch }) {
    dispatch(resetState());
  }
})(Component);
