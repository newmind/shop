
import {
  UPDATE_PRODUCT_IN_CART,
} from './types';


export const updateProductAction = (product) => ({
  type: UPDATE_PRODUCT_IN_CART,
  payload: product,
});
