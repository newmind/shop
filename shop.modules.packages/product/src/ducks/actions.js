
import {
  PAGE_IN_PROCESS,

  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,

  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST_FAIL,
  GET_PRODUCT_BY_ID_REQUEST_SUCCESS,

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_REQUEST_FAIL,
  CREATE_COMMENT_REQUEST_SUCCESS,
} from "./types";


export const pageInProcessAction = (status) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});


export const addProductToCartAction = (data) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: data,
});

export const removeProductFromCartAction = (id) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: id,
});


export const getProductByIdRequest = (id) => ({
  type: GET_PRODUCT_BY_ID_REQUEST,
  payload: id,
});

export const getProductByIdRequestFail = () => ({
  type: GET_PRODUCT_BY_ID_REQUEST_FAIL,
});

export const getProductByIdRequestSuccess = (data) => ({
  type: GET_PRODUCT_BY_ID_REQUEST_SUCCESS,
  payload: data,
});


export const createCommentRequestAction = () => ({
  type: CREATE_COMMENT_REQUEST,
  payload: null,
});

export const createCommentRequestFailAction = () => ({
  type: CREATE_COMMENT_REQUEST_FAIL,
  payload: null,
});

export const createCommentRequestSuccessAction = (data) => ({
  type: CREATE_COMMENT_REQUEST_SUCCESS,
  payload: data,
});
