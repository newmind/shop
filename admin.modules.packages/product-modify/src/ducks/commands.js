
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import { replace } from 'react-router-redux';

import {
  resetAction,
  pageInProcessAction,

  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  getCurrenciesRequestAction,
  getCurrenciesRequestFailAction,
  getCurrenciesRequestSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  updateProductRequestAction,
  updateProductRequestFailAction,
  updateProductRequestSuccessAction,

  createProductRequestAction,
  createProductRequestFailAction,
  createProductRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
};

export const resetData = () => async (dispatch) => {
  dispatch(resetAction());
};


export const getUnits = () => async (dispatch) => {
  try {

    dispatch(getUnitsRequestAction());

    const result = await request({
      method: 'get',
      url: '/units'
    });

    dispatch(getUnitsRequestSuccessAction(result));
  }
  catch(error) {

    dispatch(getUnitsRequestFailAction(error));
  }
};

export const getCurrencies = () => async (dispatch) => {
  try {

    dispatch(getCurrenciesRequestAction());

    const result = await request({
      method: 'get',
      url: '/currency'
    });

    dispatch(getCurrenciesRequestSuccessAction(result));
  }
  catch(error) {

    dispatch(getCurrenciesRequestFailAction(error));
  }
};

export const getCategories = () => async (dispatch) => {
  try {

    dispatch(getCategoriesRequestAction());

    const result = await request({
      method: 'get',
      url: '/category'
    });

    dispatch(getCategoriesRequestSuccessAction(result));
  }
  catch(error) {

    dispatch(getCategoriesRequestFailAction(error));
  }
};


export const getProductById = (id) => async (dispatch) => {
  try {

    if ( ! id) {
      return;
    }

    dispatch(pageInProcess(true));
    dispatch(getProductRequestAction());

    const result = await request({
      method: 'get',
      url: `/products/${id}`
    });

    const product = result['data'];

    const resultData = {
      ...product,
      gallery: product['gallery'].map(img => img['id']),
      attributes: product['attributes'].map(item => {
        return {
          id: item['id'],
          name: item['name'],
          value: item['value'],
          unitId: item['unit'] ? item['unit']['id'] : null,
        };
      }),
    };

    dispatch(getProductRequestSuccessAction(resultData));
    dispatch(pageInProcess(false));
  }
  catch(error) {

    dispatch(getProductRequestFailAction(error['message']));
    dispatch(pageInProcess(false));
  }
};

export const updateProductsById = (data) => async (dispatch) => {
  try {

    dispatch(updateProductRequestAction());

    const formData = new FormData();

    (data['gallery'] || []).forEach((file, index) => {
      if (file.constructor === File) {
        formData.append(`file-${index}`, file);
      }
    });

    Object.keys(data).forEach((key) => {
      if (key === 'attributes') {
        formData.append(key, JSON.stringify(data[key]));
      }
      else if (key === 'category') {
        formData.append('categoryId', data[key] ? data[key]['id'] : null);
      }
      else if (key === 'currency') {
        formData.append('currencyId', data[key] ? data[key]['id'] : null);
      }
      else if (key !== 'gallery') {
        formData.append(key, data[key]);
      }
    });

    const result = await request({
      method: 'put',
      url: `/products/${data['id']}`,
      data: formData,
    });

    const resultData = {
      ...result,
      gallery: result['gallery'].map(img => img['id']),
      attributes: result['attributes'] ? result['attributes'].map(item => {
        return {
          id: item['id'],
          name: item['name'],
          value: item['value'],
          unitId: item['unit'] ? item['unit']['id'] : null,
        };
      }) : []
    };

    dispatch(updateProductRequestSuccessAction(resultData));
    dispatch(pushNotification({ content: 'Товар успешно обновлен' }));
  }
  catch(error) {

    dispatch(updateProductRequestFailAction());
    dispatch(pushNotification({
      mode: 'danger',
      title: 'Ошибка при сохранении данных',
      content: `${error['data']['message']} (${error['data']['code']})`
    }));
  }
};

export const createProduct = (data) => async dispatch => {
  try {

    dispatch(createProductRequestAction());

    const formData = new FormData();

    (data['gallery'] || []).forEach((file, index) => {
      if (file.constructor === File) {
        formData.append(`file-${index}`, file);
      }
    });

    Object.keys(data).forEach(key => {
      if (key === 'currency') {
        formData.append('currencyId', data[key]['id']);
      }
      else if (key !== 'gallery' && key !== 'attributes') {
        formData.append(key, data[key]);
      }
      else if (key === 'attributes') {
        formData.append(key, JSON.stringify(data[key]));
      }
    });

    const result = await request({
      method: 'post',
      url: `/products`,
      data: formData,
    });

    const resultData = {
      ...result,
      gallery: result['gallery'].map(img => img['id']),
      attributes: result['attributes'] ? result['attributes'].map(item => {
        return {
          id: item['id'],
          name: item['name'],
          value: item['value'],
          unitId: item['unit'] ? item['unit']['id'] : null,
        };
      }) : []
    };

    dispatch(createProductRequestSuccessAction(resultData));
    dispatch(replace('/'));

  } catch(error) {

    dispatch(pushNotification({
      title: 'Ошибка запроса',
      content: error['message'],
      type: 'danger'
    }));
    dispatch(createProductRequestFailAction());
  }
};