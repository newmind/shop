
import {
  openCartAction,
  closeCartAction,

  removeProductAction,
} from './actions';


export const openCart = () => dispatch => {
  dispatch(openCartAction());
};

export const closeCart = () => dispatch => {
  dispatch(closeCartAction());
};

export const removeProduct = (id) => dispatch => {
  dispatch(removeProductAction(id));
};
