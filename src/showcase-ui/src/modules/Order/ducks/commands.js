
import {
  updateProductAction,
} from './actions';


export const updateProduct = (product) => dispatch => {

  dispatch(updateProductAction(product));
};
