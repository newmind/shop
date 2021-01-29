
import HOC from '@ui.packages/hoc';
import { on, off } from '@ui.packages/socket';
import { queryToObject } from "@ui.packages/utils";

import Component from './Component';

import { getProducts } from '../ducks/commands';
import {
  resetState,

  updateProductsRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  async onMount({ dispatch, location }) {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Товар`;
    document.querySelector('meta[name="description"]').setAttribute('content', '');

    const query = queryToObject(location['search']);

    await dispatch(getProducts(query));

    on(process.env['REACT_APP_SOCKET_PRODUCT_CREATE'], () => {});
    on(process.env['REACT_APP_SOCKET_PRODUCT_UPDATE'], (data) => dispatch(updateProductsRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_PRODUCT_DELETE'], () => {});
  },
  async onUpdate({ location, dispatch }) {
    const query = queryToObject(location['search']);
    await dispatch(getProducts(query));
  },
  async onUnmount({ dispatch }) {

    await dispatch(resetState());

    off(process.env['REACT_APP_SOCKET_PRODUCT_CREATE']);
    off(process.env['REACT_APP_SOCKET_PRODUCT_UPDATE']);
    off(process.env['REACT_APP_SOCKET_PRODUCT_DELETE']);
  }
})(Component);
