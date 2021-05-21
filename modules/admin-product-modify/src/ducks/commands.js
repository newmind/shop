
import { UnauthorizedError } from '@packages/errors';

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

  getGalleryRequestAction,
  getGalleryRequestFailAction,
  getGalleryRequestSuccessAction,

  getPromotionsRequestAction,
  getPromotionsRequestFailAction,
  getPromotionsRequestSuccessAction,
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }

  return null;
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Types',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }

  return null;
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Categories',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }

  return null;
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Currencies',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }

  return null;
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный Attributes',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }

  return null;
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при получании данный продукта',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }

  return null;
};

export const updateProductsById = (data) => async (dispatch) => {
  try {
    dispatch(updateProductRequestAction());

    const result = await request({
      method: 'put',
      url: `/products/${data['uuid']}`,
      data: {
        gallery: [],
        ...data,
        characteristics: data['characteristics'].map((char) => ({
          ...char,
          attributes: char['attributes'].map((attr) => ({
            id: attr['id'],
            value: attr['value'],
            use: attr['use'],
          })),
        })),
      },
    });

    dispatch(updateProductRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      title: 'Товар успешно обновлен',
      mode: Mode.SUCCESS,
    }));
  }
  catch(error) {
    console.log(error)
    dispatch(updateProductRequestFailAction());

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: Mode.DANGER,
      title: 'Ошибка при сохранении данных',
      content: `${error['data']['message']} (${error['data']['code']})`,
      autoClose: false,
    }));
  }

  return null;
};

export const createProduct = (data) => async dispatch => {
  try {
    dispatch(createProductRequestAction());

    const uuid = uniqName();

    await request({
      url: '/products',
      method: 'post',
      data: {
        uuid,
        gallery: [],
        characteristics: [],
        ...data,
      },
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка удаления изображения',
      content: error['message'],
      type: Mode.DANGER,
    }));
  }
};

export const getGallery = () => async (dispatch) => {
  try {
    dispatch(getGalleryRequestAction());

    const result = await request({
      url: `/gallery`,
      method: 'get',
    });

    dispatch(getGalleryRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getGalleryRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка загрузки изображения',
      content: error['message'],
      type: Mode.DANGER,
    }));
  }

  return null;
};

export const getPromotions = () => async (dispatch) => {
  try {
    dispatch(getPromotionsRequestAction());

    const result = await request({
      url: `/promotions`,
      method: 'get',
    });

    dispatch(getPromotionsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getPromotionsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка загрузки скидок',
      content: error['message'],
      type: Mode.DANGER,
    }));
  }

  return null;
};
