
import {
  ADD_PRODUCT_TO_CART,

  CLOSE_DIALOG,
  OPEN_DIALOG,

  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST_FAIL,
  GET_PRODUCT_BY_ID_REQUEST_SUCCESS,

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_REQUEST_FAIL,
  CREATE_COMMENT_REQUEST_SUCCESS,
} from "./types";


export const openDialogAction = (data) => ({
  type: OPEN_DIALOG,
  payload: data,
});

export const closeDialogAction = () => ({
  type: CLOSE_DIALOG,
});


export const addProductToCartAction = (data) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: data,
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

export const createCommentRequestFailAction = (error) => ({
  type: CREATE_COMMENT_REQUEST_FAIL,
  payload: null,
});

export const createCommentRequestSuccessAction = (data) => ({
  type: CREATE_COMMENT_REQUEST_SUCCESS,
  payload: data,
});
