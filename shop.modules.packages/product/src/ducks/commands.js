
import request from "@ui.packages/request";

import {
  pageInProcessAction,

  addProductToCartAction,

  getProductByIdRequest,
  getProductByIdRequestFail,
  getProductByIdRequestSuccess,

  createCommentRequestAction,
  createCommentRequestFailAction,
  createCommentRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
};


export const addProductToCart = (product) => (dispatch) => {
  dispatch(addProductToCartAction(product));
};

export const getProductById = (id) => async (dispatch) => {
  try {

    dispatch(getProductByIdRequest());

    const result = await request({
      method: 'get',
      url: `/products/${id}`
    });

    dispatch(getProductByIdRequestSuccess(result));

    return void 0;

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