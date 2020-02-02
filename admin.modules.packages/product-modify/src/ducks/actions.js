
import {
  RESET,

  PAGE_IN_PROCESS,

  GET_UNITS_REQUEST,
  GET_UNITS_REQUEST_FAIL,
  GET_UNITS_REQUEST_SUCCESS,

  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_REQUEST_FAIL,
  GET_CURRENCIES_REQUEST_SUCCESS,

  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REQUEST_FAIL,
  GET_PRODUCT_REQUEST_SUCCESS,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_FAIL,
  UPDATE_PRODUCT_REQUEST_SUCCESS,

  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_FAIL,
  CREATE_PRODUCT_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (status = true) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});


export const resetAction = () => ({
  type: RESET,
  payload: null,
});


export const getUnitsRequestAction = () => ({
  type: GET_UNITS_REQUEST,
});
export const getUnitsRequestFailAction = () => ({
  type: GET_UNITS_REQUEST_FAIL,
});
export const getUnitsRequestSuccessAction = (data) => {
  return {
    type: GET_UNITS_REQUEST_SUCCESS,
    payload: data,
  }
};

export const getCurrenciesRequestAction = () => ({
  type: GET_CURRENCIES_REQUEST,
});
export const getCurrenciesRequestFailAction = () => ({
  type: GET_CURRENCIES_REQUEST_FAIL,
});
export const getCurrenciesRequestSuccessAction = (data) => {
  return {
    type: GET_CURRENCIES_REQUEST_SUCCESS,
    payload: data,
  }
};

export const getProductRequestAction = () => ({
  type: GET_PRODUCT_REQUEST,
});
export const getProductRequestFailAction = () => ({
  type: GET_PRODUCT_REQUEST_FAIL,
});
export const getProductRequestSuccessAction = (data) => {
  return {
    type: GET_PRODUCT_REQUEST_SUCCESS,
    payload: data,
  }
};


export const updateProductRequestAction = () => ({
  type: UPDATE_PRODUCT_REQUEST,
});
export const updateProductRequestFailAction = () => ({
  type: UPDATE_PRODUCT_REQUEST_FAIL,
});
export const updateProductRequestSuccessAction = (data) => {
  return {
    type: UPDATE_PRODUCT_REQUEST_SUCCESS,
    payload: data,
  }
};


export const createProductRequestAction = () => ({
  type: CREATE_PRODUCT_REQUEST,
});
export const createProductRequestFailAction = () => ({
  type: CREATE_PRODUCT_REQUEST_FAIL,
});
export const createProductRequestSuccessAction = (data) => ({
  type: CREATE_PRODUCT_REQUEST_SUCCESS,
  payload: data,
});
