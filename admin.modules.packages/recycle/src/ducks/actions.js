
import {
  PAGE_IN_PROCESS,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_REQUEST_FAIL,
  REMOVE_PRODUCT_REQUEST_SUCCESS,
} from './types';


export const pageInProcess = (status = true) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});

export const getProductsRequestAction = () => ({
  type: GET_PRODUCTS_REQUEST,
});

export const getProductsRequestFailAction = () => ({
  type: GET_PRODUCTS_REQUEST_FAIL,
});

export const getProductsRequestSuccessAction = (data) => {
  return {
    type: GET_PRODUCTS_REQUEST_SUCCESS,
    payload: data,
  }
};


export const removeProductsRequestAction = () => ({
  type: REMOVE_PRODUCT_REQUEST,
});

export const removeProductsRequestFailAction = () => ({
  type: REMOVE_PRODUCT_REQUEST_FAIL,
});

export const removeProductsRequestSuccessAction = (data) => {
  return {
    type: REMOVE_PRODUCT_REQUEST_SUCCESS,
    payload: data,
  }
};
