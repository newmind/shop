
import {
  PAGE_IN_PROCESS,

  NEXT_PAGE,
  ADD_PRODUCT_TO_CART,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (status) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});

export const addProductToCartAction = (data) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: data,
});

export const setNextPageAction = (page) => ({
  type: NEXT_PAGE,
  payload: page,
});

export const getProductsRequest = () => ({
  type: GET_PRODUCTS_REQUEST,
});
export const getProductsRequestFail = () => ({
  type: GET_PRODUCTS_REQUEST_FAIL,
});
export const getProductsRequestSuccess = (data) => ({
  type: GET_PRODUCTS_REQUEST_SUCCESS,
  payload: data,
});
