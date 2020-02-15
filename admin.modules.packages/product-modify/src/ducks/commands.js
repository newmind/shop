
import request from '@ui.packages/request';
import { uniqName } from '@ui.packages/utils';
import { pushNotification } from '@ui.packages/notifications';

import { replace } from 'react-router-redux';

import {
  resetAction,
  pageInProcessAction,

  getTypesRequestAction,
  getTypesRequestFailAction,
  getTypesRequestSuccessAction,

  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  getColorsRequestAction,
  getCoorsRequestFailAction,
  getColorsRequestSuccessAction,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  getMaterialsRequestAction,
  getMaterialsRequestFailAction,
  getMaterialsRequestSuccessAction,

  getFormsRequestAction,
  getFormsRequestFailAction,
  getFormsRequestSuccessAction,

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

  deleteImagesRequestAction,
  deleteImagesRequestFailAction,
  deleteImagesRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => { dispatch(pageInProcessAction(status)); };

export const resetData = () => async (dispatch) => { dispatch(resetAction()); };


export const getTypes = () => async (dispatch) => {
  try {
    dispatch(getTypesRequestAction());

    const result = await request({
      url: '/types',
      method: 'get',
    });

    dispatch(getTypesRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getTypesRequestFailAction(error));
  }
};

export const getUnits = () => async (dispatch) => {
  try {
    dispatch(getUnitsRequestAction());

    const result = await request({
      method: 'get',
      url: '/units'
    });

    dispatch(getUnitsRequestSuccessAction(result['data']));
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
      url: '/currencies'
    });

    dispatch(getCurrenciesRequestSuccessAction(result['data']));
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
      url: '/categories'
    });

    dispatch(getCategoriesRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getCategoriesRequestFailAction(error));
  }
};

export const getColors = () => async (dispatch) => {
  try {

    dispatch(getColorsRequestAction());

    const result = await request({
      method: 'get',
      url: '/colors'
    });

    dispatch(getColorsRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getCoorsRequestFailAction(error));
  }
};

export const getMaterials = () => async (dispatch) => {
  try {

    dispatch(getMaterialsRequestAction());

    const result = await request({
      method: 'get',
      url: '/materials'
    });

    dispatch(getMaterialsRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getMaterialsRequestFailAction(error));
  }
};

export const getForms = () => async (dispatch) => {
  try {
    dispatch(getFormsRequestAction());

    const result = await request({
      method: 'get',
      url: '/forms'
    });

    dispatch(getFormsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getFormsRequestFailAction(error));
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

    console.log(data);

    dispatch(updateProductRequestAction());

    const formData = new FormData();

    (data['gallery'] || []).forEach((file, index) => {
      if (file.constructor === File) {
        formData.append(`file-${index}`, file);
      }
    });

    formData.append('brand', data['brand']);
    formData.append('name', data['name']);
    formData.append('typeId', data['type'] ? data['type']['id'] : null);
    formData.append('categoryId', data['category'] ? data['category']['id'] : null);
    formData.append('colorId', data['color'] ? data['color']['id'] : null);
    formData.append('materialId', data['material'] ? data['material']['id'] : null);
    formData.append('formId', data['form'] ? data['form']['id'] : null);
    formData.append('description', data['description']);
    formData.append('params', data['params'] || null);
    formData.append('amount', data['amount']);
    formData.append('saleAmount', data['saleAmount'] || null);
    formData.append('currencyId', data['currency'] ? data['currency']['id'] : null);
    formData.append('count', data['count']);
    formData.append('attributes', JSON.stringify(data['attributes'] || []));

    const result = await request({
      method: 'put',
      url: `/products/${data['id']}`,
      data: formData,
    });

    const resultData = {
      ...result['data'],
      gallery: result['data']['gallery'].map((img) => img['id']),
      attributes: result['data']['attributes'] ? result['data']['attributes'].map((item) => {
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

    formData.append('uuid', uniqName());
    formData.append('count', data['count']);
    formData.append('amount', data['amount']);
    formData.append('typeId', data['type']['id']);
    formData.append('description', data['description']);
    formData.append('currencyId', data['currency']['id']);
    formData.append('attributes', JSON.stringify(data['attributes'] || []));

    data['params'] && formData.append('params', data['params']);
    data['name'] && formData.append('name', data['name']);
    data['brand'] && formData.append('brand', data['brand']);
    data['form'] && formData.append('formId', data['form']['id']);
    data['color'] && formData.append('colorId', data['color']['id']);
    data['saleAmount'] && formData.append('saleAmount', data['saleAmount']);
    data['category'] && formData.append('categoryId', data['category']['id']);
    data['material'] && formData.append('materialId', data['material']['id']);

    const result = await request({
      method: 'post',
      url: `/products`,
      data: formData,
    });

    const resultData = {
      ...result['data'],
      gallery: result['data']['gallery'].map((img) => img['id']),
      attributes: result['data']['attributes'] ? result['data']['attributes'].map((item) => {
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

export const deleteImages = (id) => async (dispatch) => {
  try {
    dispatch(deleteImagesRequestAction());

    const result = await request({
      url: `/gallery`,
      method: 'delete',
      data: { id },
    });

    dispatch(deleteImagesRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(pushNotification({
      title: 'Ошибка удаления изображения',
      content: error['message'],
      type: 'danger'
    }));
    dispatch(deleteImagesRequestFailAction());
  }
};