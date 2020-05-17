
import { on } from '@ui.packages/socket';

import {
  openCartAction,
  closeCartAction,

  removeProductAction,

  restoreCartAction,
  resetCartAction,
} from './actions';

import { SOCKET_PRODUCT_UPDATED } from './types';


on(SOCKET_PRODUCT_UPDATED, (data) => {
  const { localStorage } = window;
  const cart = JSON.parse(localStorage.getItem('cart'));
  const updated = cart.map((product) => {
    if (product['uuid'] === data['uuid']) {
      return {
        ...product,
        ...data,
      };
    }
    return product;
  });
  localStorage.setItem('cart', JSON.stringify(updated));
});


export const openCart = () => dispatch => {
  dispatch(openCartAction());
};

export const closeCart = () => dispatch => {
  dispatch(closeCartAction());
};

export const removeProduct = (id) => dispatch => {
  dispatch(removeProductAction(id));
};

export const getCartFromLocalStorage = () => dispatch => {

  const { localStorage } = window;
  const cart = localStorage.getItem('cart');

  if (cart) {
    dispatch(restoreCartAction(JSON.parse(cart)));
  }
};

export const resetCart = () => dispatch => {

  const { localStorage } = window;

  localStorage.removeItem('cart');

  dispatch(resetCartAction());
};
