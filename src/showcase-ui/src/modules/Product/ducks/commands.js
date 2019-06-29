
import request from "@packages/request";

import {
  addProductToCartAction,

  openDialogAction,
  closeDialogAction,

  getProductByIdRequest,
  getProductByIdRequestFail,
  getProductByIdRequestSuccess,

  createCommentRequestAction,
  createCommentRequestFailAction,
  createCommentRequestSuccessAction,
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


export const createComment = (productId, formData) => async dispatch => {
  try {

    dispatch(createCommentRequestAction());

    const result = await request({
      method: 'post',
      url: `/products/${productId}/comments`,
      data: formData,
    });

    dispatch(createCommentRequestSuccessAction(result));

  } catch(error) {

    dispatch(createCommentRequestFailAction(error));
  }
};
