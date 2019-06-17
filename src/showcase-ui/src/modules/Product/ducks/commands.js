
import request from "@packages/request";

import {
  addProductToCartAction,

  openDialogAction,
  closeDialogAction,

  getProductByIdRequest,
  getProductByIdRequestFail,
  getProductByIdRequestSuccess,
} from './actions';


export const openDialog = (product) => dispatch => {
  dispatch(openDialogAction(product));
};

export const closeDialog = () => dispatch => {
  dispatch(closeDialogAction());
};

export const addProductToCart = (product) => dispatch => {
  dispatch(addProductToCartAction(product));
};

export const getProductById = (id) => async dispatch => {
  try {

    dispatch(getProductByIdRequest());

    const result = await request({
      method: 'get',
      url: `/products/${id}`
    });

    dispatch(getProductByIdRequestSuccess(result));

  } catch(error) {
    dispatch(getProductByIdRequestFail(error));
  }
};