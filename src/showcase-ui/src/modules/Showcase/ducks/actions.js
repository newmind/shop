
import {
  ADD_PRODUCT_TO_CART,

  OPEN_DIALOG,
  CLOSE_DIALOG,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  GET_ADDITIONAL_DATA_REQUEST,
  GET_ADDITIONAL_DATA_REQUEST_FAIL,
  GET_ADDITIONAL_DATA_REQUEST_SUCCESS,
} from './types';


export const addProductToCartAction = (data) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: data,
});

export const openDialogAction = (data) => ({
  type: OPEN_DIALOG,
  payload: data,
});

export const closeDialogAction = () => ({
  type: CLOSE_DIALOG,
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


export const getAdditionalDataRequestAction = () => ({
  type: GET_ADDITIONAL_DATA_REQUEST,
  payload: null,
});

export const getAdditionalDataRequestSuccessAction = (data) => ({
  type: GET_ADDITIONAL_DATA_REQUEST_SUCCESS,
  payload: data,
});

export const getAdditionalDataRequestFailAction = (error) => ({
  type: GET_ADDITIONAL_DATA_REQUEST_FAIL,
  payload: error,
});
