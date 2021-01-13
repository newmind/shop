
import HOC from '@ui.packages/hoc';
import { queryToObject } from "@ui.packages/utils";

import Component from './Component';

import { resetState } from '../ducks/slice';
import { getProducts } from '../ducks/commands';


export default HOC({
  onMount({ dispatch, location }) {
    const search = queryToObject(location['search']);

    dispatch(getProducts(search));
  },
  onUnmount({ dispatch }) {
    dispatch(resetState());
  }
})(Component);
