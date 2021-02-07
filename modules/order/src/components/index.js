
import HOC from "@ui.packages/hoc";

import Component from './Component';

import { resetStateAction, restoreStateAction } from '../ducks/slice';
import { getProducts, getAmount } from '../ducks/commands';


export default HOC({
  combineEvents: true,
  onMount({ dispatch }) {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;
    document.querySelector('meta[name="description"]').setAttribute('content', '');

    dispatch(restoreStateAction());

    const cart = window.localStorage.getItem('cart');
    const uuid = JSON.parse(cart) || [];

    if (uuid.length) {
      dispatch(getProducts(uuid));
      dispatch(getAmount(uuid));
    }
  },
  onUnmount({ dispatch }) {

    dispatch(resetStateAction());
  }
})(Component);
