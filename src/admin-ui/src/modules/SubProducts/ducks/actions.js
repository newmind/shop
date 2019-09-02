
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,

  GET_SUB_PRODUCTS_REQUEST,
  GET_SUB_PRODUCTS_REQUEST_FAIL,
  GET_SUB_PRODUCTS_REQUEST_SUCCESS,

  CREATE_SUB_PRODUCTS_REQUEST,
  CREATE_SUB_PRODUCTS_REQUEST_FAIL,
  CREATE_SUB_PRODUCTS_REQUEST_SUCCESS,

  REMOVE_SUB_PRODUCT_REQUEST,
  REMOVE_SUB_PRODUCT_REQUEST_FAIL,
  REMOVE_SUB_PRODUCT_REQUEST_SUCCESS,
} from './types';


export const openDialogAction = () => ({
  type: OPEN_DIALOG,
});

export const closeDialogAction = () => ({
  type: CLOSE_DIALOG,
});


export const getProductsRequestAction = () => ({
  type: GET_SUB_PRODUCTS_REQUEST,
});

export const getProductsRequestFailAction = () => ({
  type: GET_SUB_PRODUCTS_REQUEST_FAIL,
});

export const getProductsRequestSuccessAction = (data) => {
  return {
    type: GET_SUB_PRODUCTS_REQUEST_SUCCESS,
    payload: data,
  }
};


export const createProductsRequestAction = () => ({
  type: CREATE_SUB_PRODUCTS_REQUEST,
});

export const createProductsRequestFailAction = () => ({
  type: CREATE_SUB_PRODUCTS_REQUEST_FAIL,
});

export const createProductsRequestSuccessAction = (data) => {
  return {
    type: CREATE_SUB_PRODUCTS_REQUEST_SUCCESS,
    payload: data,
  }
};


export const removeProductsRequestAction = () => ({
  type: REMOVE_SUB_PRODUCT_REQUEST,
});

export const removeProductsRequestFailAction = () => ({
  type: REMOVE_SUB_PRODUCT_REQUEST_FAIL,
});

export const removeProductsRequestSuccessAction = (data) => {
  return {
    type: REMOVE_SUB_PRODUCT_REQUEST_SUCCESS,
    payload: data,
  }
};
