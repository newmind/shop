
import { Mode } from '@ui.packages/types';
import request from '@ui.packages/request';
import { uniqName } from '@ui.packages/utils';
import { pushNotification } from '@ui.packages/notifications';

import {
  getTypesRequestAction,
  getTypesRequestFailAction,
  getTypesRequestSuccessAction,

  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  getColorsRequestAction,
  getColorsRequestFailAction,
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

  deleteImageRequestAction,
  deleteImageRequestFailAction,
  deleteImageRequestSuccessAction,
} from './slice';


export const getTypes = () => async (dispatch) => {
  try {
    dispatch(getTypesRequestAction());

    const { data } = await request({
      url: '/types',
      method: 'get',
    });

    dispatch(getTypesRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getTypesRequestFailAction(error));
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Types',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
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
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Units',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
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
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Currencies',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
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
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Categories',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
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
    dispatch(getColorsRequestFailAction(error));
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Colors',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
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
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Materials',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
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
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Forms',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }
};


export const getProductById = (uuid) => async (dispatch) => {
  try {
    if ( ! uuid) {
      return;
    }

    dispatch(getProductRequestAction());

    const result = await request({
      method: 'get',
      url: `/products/${uuid}`
    });

    dispatch(getProductRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getProductRequestFailAction(error));
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный продукта',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
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

    formData.append('brand', data['brand']);
    formData.append('name', data['name']);
    formData.append('typeId', data['typeId']);
    formData.append('categoryId', data['categoryId']);
    formData.append('colorId', data['colorId']);
    formData.append('materialId', data['materialId']);
    formData.append('formId', data['formId']);
    formData.append('description', data['description']);
    formData.append('params', data['params'] || null);
    formData.append('amount', data['amount']);
    formData.append('saleAmount', data['saleAmount'] || null);
    formData.append('currencyId', data['currencyId']);
    formData.append('count', data['count']);
    formData.append('attributes', JSON.stringify(data['attributes'] || []));

    const result = await request({
      method: 'put',
      url: `/products/${data['uuid']}`,
      data: formData,
    });

    dispatch(updateProductRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      content: 'Товар успешно обновлен',
      mode: Mode.SUCCESS,
    }));
  }
  catch(error) {
    dispatch(updateProductRequestFailAction());
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при сохранении данных',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }
};

export const createProduct = (data) => async dispatch => {
  try {
    dispatch(createProductRequestAction());

    const formData = new FormData();

    (data['gallery'] || []).forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`file-${index}`, file);
      }
    });

    formData.append('uuid', uniqName());
    formData.append('name', data['name']);
    formData.append('brand', data['brand']);
    formData.append('count', data['count']);
    formData.append('amount', data['amount']);
    formData.append('description', data['description']);
    formData.append('params', data['params'] || null);
    formData.append('saleAmount', data['saleAmount'] || null);
    formData.append('attributes', JSON.stringify(data['attributes'] || []));

    data['typeId'] && formData.append('typeId', data['typeId']);
    data['formId'] && formData.append('formId', data['formId']);
    data['colorId'] && formData.append('colorId', data['colorId']);
    data['materialId'] && formData.append('materialId', data['materialId']);
    data['currencyId'] && formData.append('currencyId', data['currencyId']);
    data['categoryId'] && formData.append('categoryId', data['categoryId']);

    const result = await request({
      method: 'post',
      url: `/products`,
      data: formData,
    });

    dispatch(createProductRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(createProductRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка присозранении данных',
      content: error['message'],
      type: 'danger'
    }));
  }
};

export const deleteImages = (uuid) => async (dispatch) => {
  try {
    dispatch(deleteImageRequestAction());

    const result = await request({
      url: `/gallery`,
      method: 'delete',
      data: { uuid },
    });

    dispatch(deleteImageRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteImageRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка удаления изображения',
      content: error['message'],
      type: 'danger'
    }));
  }
};
