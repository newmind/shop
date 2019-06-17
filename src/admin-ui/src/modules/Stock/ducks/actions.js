
import {
  DESTROY,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,

  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_REQUEST_FAIL,
  GET_CURRENCIES_REQUEST_SUCCESS,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  GET_STOCK_PRODUCTS_REQUEST,
  GET_STOCK_PRODUCTS_REQUEST_FAIL,
  GET_STOCK_PRODUCTS_REQUEST_SUCCESS,

  GET_STOCK_PRODUCTS_BY_ID_REQUEST,
  GET_STOCK_PRODUCTS_BY_ID_REQUEST_FAIL,
  GET_STOCK_PRODUCTS_BY_ID_REQUEST_SUCCESS,

  CREATE_STOCK_PRODUCTS_REQUEST,
  CREATE_STOCK_PRODUCTS_REQUEST_FAIL,
  CREATE_STOCK_PRODUCTS_REQUEST_SUCCESS,

  UPDATE_STOCK_PRODUCTS_REQUEST,
  UPDATE_STOCK_PRODUCTS_REQUEST_FAIL,
  UPDATE_STOCK_PRODUCTS_REQUEST_SUCCESS,

  DELETE_STOCK_PRODUCTS_REQUEST,
  DELETE_STOCK_PRODUCTS_REQUEST_FAIL,
  DELETE_STOCK_PRODUCTS_REQUEST_SUCCESS,

} from './types';


export const destroyAction = () => ({
  type: DESTROY,
  payload: null,
});


export const getCategoriesAction = () => ({
  type: GET_CATEGORIES_REQUEST,
  payload: null,
});

export const getCategoriesSuccessAction = (data) => ({
  type: GET_CATEGORIES_REQUEST_SUCCESS,
  payload: data,
});

export const getCategoriesFailAction = (error) => ({
  type: GET_CATEGORIES_REQUEST_FAIL,
  payload: error,
});



export const getCurrenciesAction = () => ({
  type: GET_CURRENCIES_REQUEST,
  payload: null,
});

export const getCurrenciesSuccessAction = (data) => ({
  type: GET_CURRENCIES_REQUEST_SUCCESS,
  payload: data,
});

export const getCurrenciestFailAction = (error) => ({
  type: GET_CURRENCIES_REQUEST_FAIL,
  payload: error,
});


export const deleteStockProductRequestAction = () => ({
  type: DELETE_STOCK_PRODUCTS_REQUEST,
  payload: null,
});

export const deleteStockProductRequestSuccessAction = (data) => ({
  type: DELETE_STOCK_PRODUCTS_REQUEST_SUCCESS,
  payload: data,
});

export const deleteStockProductRequestFailAction = (error) => ({
  type: DELETE_STOCK_PRODUCTS_REQUEST_FAIL,
  payload: error,
});


export const updateStockProductRequestAction = () => ({
  type: UPDATE_STOCK_PRODUCTS_REQUEST,
  payload: null,
});

export const updateStockProductRequestSuccessAction = (data) => ({
  type: UPDATE_STOCK_PRODUCTS_REQUEST_SUCCESS,
  payload: data,
});

export const updateStockProductRequestFailAction = (error) => ({
  type: UPDATE_STOCK_PRODUCTS_REQUEST_FAIL,
  payload: error,
});


export const createStockProductRequestAction = () => ({
  type: CREATE_STOCK_PRODUCTS_REQUEST,
  payload: null,
});

export const createStockProductRequestSuccessAction = (data) => ({
  type: CREATE_STOCK_PRODUCTS_REQUEST_SUCCESS,
  payload: data,
});

export const createStockProductRequestFailAction = (error) => ({
  type: CREATE_STOCK_PRODUCTS_REQUEST_FAIL,
  payload: error,
});


export const getStockProductByIdRequestAction = () => ({
  type: GET_STOCK_PRODUCTS_BY_ID_REQUEST,
  payload: null,
});

export const getStockProductByIdRequestSuccessAction = (data) => ({
  type: GET_STOCK_PRODUCTS_BY_ID_REQUEST_SUCCESS,
  payload: data,
});

export const getStockProductByIdRequestFailAction = (error) => ({
  type: GET_STOCK_PRODUCTS_BY_ID_REQUEST_FAIL,
  payload: error,
});


export const getStockProductsRequestAction = () => ({
  type: GET_STOCK_PRODUCTS_REQUEST,
  payload: null,
});

export const getStockProductsRequestSuccessAction = (data) => ({
  type: GET_STOCK_PRODUCTS_REQUEST_SUCCESS,
  payload: data,
});

export const getStockProductsRequestFailAction = (error) => ({
  type: GET_STOCK_PRODUCTS_REQUEST_FAIL,
  payload: error,
});


export const getProductRequestAction = () => ({
  type: GET_PRODUCTS_REQUEST,
  payload: null,
});

export const getProductRequestSuccessAction = (data) => ({
  type: GET_PRODUCTS_REQUEST_SUCCESS,
  payload: data,
});

export const getProductRequestFailAction = (error) => ({
  type: GET_PRODUCTS_REQUEST_FAIL,
  payload: error,
});
