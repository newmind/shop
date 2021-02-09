
import { Mode } from '@ui.packages/types';
import request from '@ui.packages/request';
import { uniqName } from '@ui.packages/utils';
import { pushNotification } from '@ui.packages/notifications';

import {
  getBrandsRequestAction,
  getBrandsRequestFailAction,
  getBrandsRequestSuccessAction,

  getTypesRequestAction,
  getTypesRequestFailAction,
  getTypesRequestSuccessAction,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  getCurrenciesRequestAction,
  getCurrenciesRequestFailAction,
  getCurrenciesRequestSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  getAttributesRequestAction,
  getAttributesRequestFailAction,
  getAttributesRequestSuccessAction,

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


export const getBrands = () => async (dispatch) => {
  try {
    dispatch(getBrandsRequestAction());

    const { data } = await request({
      url: '/brands',
      method: 'get',
    });

    dispatch(getBrandsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getBrandsRequestFailAction(error));
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }
};

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

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoriesRequestAction());

    const result = await request({
      method: 'get',
      url: '/categories',
      params: {
        all: true,
      }
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
    console.log(error)
    dispatch(getCurrenciesRequestFailAction(error));
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Currencies',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }
};

export const getAttributes = () => async (dispatch) => {
  try {
    dispatch(getAttributesRequestAction());

    const result = await request({
      method: 'get',
      url: '/attributes'
    });

    dispatch(getAttributesRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getAttributesRequestFailAction(error));
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Attributes',
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

    formData.append('name', data['name']);
    formData.append('brandId', data['brandId']);
    formData.append('price', data['price']);
    formData.append('currencyCode', data['currencyCode']);
    formData.append('description', data['description']);

    formData.append('fiscal', data['fiscal'] || null);

    formData.append('types', JSON.stringify(data['types']));
    formData.append('categories', JSON.stringify(data['categories']));
    formData.append('attributes', JSON.stringify(data['attributes'].map((attr) => ({
      id: attr['id'],
      value: attr['value'],
    })) || []));

    await request({
      method: 'put',
      url: `/products/${data['uuid']}`,
      data: formData,
    });

    const result = await request({
      method: 'get',
      url: `/products/${data['uuid']}`
    });

    dispatch(updateProductRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      title: 'Товар успешно обновлен',
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

    const uuid = uniqName();
    const formData = new FormData();

    (data['gallery'] || []).forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`file-${index}`, file);
      }
    });

    formData.append('uuid', uuid);
    formData.append('name', data['name']);
    formData.append('brandId', data['brandId']);
    formData.append('price', data['price']);
    formData.append('currencyCode', data['currencyCode']);
    formData.append('description', data['description']);

    formData.append('fiscal', data['fiscal'] || null);

    formData.append('types', JSON.stringify(data['types'] || []));
    formData.append('categories', JSON.stringify(data['categories'] || []));
    formData.append('attributes', JSON.stringify(data['attributes'] || []));

    await request({
      method: 'post',
      url: `/products`,
      data: formData,
    });

    dispatch(createProductRequestSuccessAction());
    dispatch(pushNotification({
      title: 'Товар успешно добавлен',
      mode: Mode.SUCCESS,
    }));

    return uuid;
  }
  catch(error) {
    dispatch(createProductRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка при добавлении товара',
      content: error['message'],
      mode: Mode.DANGER,
    }));

    return false;
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
    dispatch(pushNotification({
      title: 'Изображения успешно удалено',
      type: Mode.SUCCESS,
    }));
  }
  catch(error) {
    dispatch(deleteImageRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка удаления изображения',
      content: error['message'],
      type: Mode.DANGER,
    }));
  }
};
