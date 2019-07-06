
import request from '@packages/request';
import { pushNotification } from '@packages/notifications';

import {
  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

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

import { replace } from 'react-router-redux';


export const getUnits = () => async dispatch => {
  try {

    dispatch(getUnitsRequestAction());

    const result = await request({
      method: 'get',
      url: '/units'
    });

    dispatch(getUnitsRequestSuccessAction(result));

  } catch(error) {

    dispatch(getUnitsRequestFailAction(error));
  }
};


export const getProductById = (id) => async dispatch => {
  try {

    if ( ! id) {
      return;
    }

    dispatch(getProductRequestAction());

    const result = await request({
      method: 'get',
      url: `/products/${id}`
    });

    const product = result['data'];
    const resultData = {
      ...product,
      gallery: result['data']['gallery'].map(img => img['id']),
      attributes: product['attributes'] ? product['attributes'].map(item => {
        return {
          id: item['id'],
          name: item['name'],
          value: item['value'],
          unitId: item['unit'] ? item['unit']['id'] : -1,
        };
      }) : []
    };

    dispatch(getProductRequestSuccessAction(resultData));

  } catch(error) {
    dispatch(getProductRequestFailAction(error['message']));
  }
};


export const updateProductsById = (data) => async dispatch => {
  try {

    dispatch(updateProductRequestAction());

    const formData = new FormData();

    (data['gallery'] || []).forEach((file, index) => {
      if (file.constructor === File) {

        formData.append(`file-${index}`, file);
      }
    });

    Object.keys(data).forEach(key => {
      if (key !== 'gallery' && key !== 'attributes') {
        formData.append(key, data[key]);
      } else if (key === 'attributes') {
        formData.append(key, JSON.stringify(data[key]));
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
          unitId: item['unit'] ? item['unit']['id'] : -1,
        };
      }) : []
    };

    dispatch(updateProductRequestSuccessAction(resultData));
    dispatch(pushNotification({ content: 'Товар успешно обновлен' }));

  } catch(error) {

    dispatch(updateProductRequestFailAction());
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
      if (key !== 'gallery' && key !== 'attributes') {
        formData.append(key, data[key]);
      } else if (key === 'attributes') {
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
          unitId: item['unit'] ? item['unit']['id'] : -1,
        };
      }) : []
    };

    dispatch(createProductRequestSuccessAction(resultData));
    dispatch(replace('/products'));

  } catch(error) {

    dispatch(pushNotification({
      title: 'Ошибка запроса',
      content: error['message'],
      type: 'danger'
    }));
    dispatch(createProductRequestFailAction());
  }
};