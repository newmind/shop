
import request from '@ui.packages/request';

import {
  pageInProcess,

  getCurrenciesAction,
  getCurrenciestFailAction,
  getCurrenciesSuccessAction,

  getCategoriesAction,
  getCategoriesFailAction,
  getCategoriesSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  getStockProductsRequestAction,
  getStockProductsRequestFailAction,
  getStockProductsRequestSuccessAction,

  getStockProductByIdRequestAction,
  getStockProductByIdRequestFailAction,
  getStockProductByIdRequestSuccessAction,

  createStockProductRequestAction,
  createStockProductRequestFailAction,
  createStockProductRequestSuccessAction,

  updateStockProductRequestAction,
  updateStockProductRequestFailAction,
  updateStockProductRequestSuccessAction,

  deleteStockProductRequestAction,
  deleteStockProductRequestFailAction,
  deleteStockProductRequestSuccessAction,
} from './actions';


export const getCategories = () => async dispatch => {

  dispatch(getCategoriesAction());

  try {

    const result = await request({
      method: 'get',
      url: '/category'
    });

    dispatch(getCategoriesSuccessAction(result['items']));

  } catch (error) {

    dispatch(getCategoriesFailAction(error));
  }
};

export const getCurrencies = () => async dispatch => {

  dispatch(getCurrenciesAction());

  try {

    const result = await request({
      method: 'get',
      url: '/currency'
    });

    return dispatch(getCurrenciesSuccessAction(result['items']));

  } catch (error) {

    dispatch(getCurrenciestFailAction(error));
  }
};

export const getStockProducts = () => async dispatch => {

  dispatch(pageInProcess(true));
  dispatch(getStockProductsRequestAction());

  try {

    const result = await request({
      method: 'get',
      url: '/stock/products'
    });

    dispatch(getStockProductsRequestSuccessAction(result['items']));

  } catch (error) {

    dispatch(getStockProductsRequestFailAction(error));
  }

  dispatch(pageInProcess(false));
};

export const getProducts = () => async dispatch => {

  dispatch(getProductRequestAction());

  try {

    const result = await request({
      method: 'get',
      url: '/products'
    });

    return dispatch(getProductRequestSuccessAction(result['items']));

  } catch (error) {

    dispatch(getProductRequestFailAction(error));
  }
};

export const getStockProductsById = (productId) => async dispatch => {

  dispatch(getStockProductByIdRequestAction());

  try {

    const result = await request({
      method: 'get',
      url: `/products/${productId}`
    });

    return dispatch(getStockProductByIdRequestSuccessAction(result));

  } catch (error) {

    dispatch(getStockProductByIdRequestFailAction(error));
  }
};

export const createProduct = (formData) => async dispatch => {

  dispatch(createStockProductRequestAction());

  try {

    const result = await request({
      method: 'post',
      url: '/stock/products',
      data: formData,
    });

    return dispatch(createStockProductRequestSuccessAction(result));

  } catch (error) {

    dispatch(createStockProductRequestFailAction(error));
  }
};

export const updateStockProductById = (formData) => async dispatch => {

  dispatch(updateStockProductRequestAction());

  try {

    const result = await request({
      method: 'put',
      url: `/stock/products/${formData['id']}`,
      data: formData,
    });

    return dispatch(updateStockProductRequestSuccessAction(result));

  } catch (error) {

    dispatch(updateStockProductRequestFailAction(error));
  }
};

export const removeProductById = (productId) => async dispatch => {

  dispatch(deleteStockProductRequestAction());

  try {

    const result = await request({
      method: 'delete',
      url: `/stock/products/${productId}`,
    });

    return dispatch(deleteStockProductRequestSuccessAction(result));

  } catch (error) {

    dispatch(deleteStockProductRequestFailAction(error));
  }
};

