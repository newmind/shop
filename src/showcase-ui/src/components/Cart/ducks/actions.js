
import {
  OPEN_CART_LIST,
  CLOSE_CART_LIST,

  REMOVE_PRODUCT_FROM_CART,
} from './types';


export const openCartAction = () => ({
  type: OPEN_CART_LIST,
});

export const closeCartAction = () => ({
  type: CLOSE_CART_LIST,
});

export const removeProductAction = (id) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: id,
});
