
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  getGalleryRequestAction,
  getGalleryRequestFailAction,
  getGalleryRequestSuccessAction,

  createGalleryRequestAction,
  createGalleryRequestFailAction,
  createGalleryRequestSuccessAction,

  deleteGalleryRequestAction,
  deleteGalleryRequestFailAction,
  deleteGalleryRequestSuccessAction,
} from './slice';


export const getGallery = () => async (dispatch) => {
  try {
    dispatch(getGalleryRequestAction());

    const result = await request({
      url: '/gallery',
      method: 'get',
    });

    dispatch(getGalleryRequestSuccessAction(result));
  }
  catch(error) {
    dispatch(getGalleryRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка при выполнении операции'
    }));
  }
};

export const createGallery = (files) => async (dispatch) => {
  try {
    dispatch(createGalleryRequestAction());

    const formData = new FormData();

    files.forEach((file, index) => formData.append('file-' + index, file));

    const result = await request({
      url: process.env['PUBLIC_URL'] + '/gallery',
      method: 'post',
      data: formData,
    });

    dispatch(closeDialog('create'));
    dispatch(createGalleryRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(createGalleryRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка при выполнении операции'
    }));
  }
}

export const deleteGallery = (uuid) => async (dispatch) => {
  try {
    dispatch(deleteGalleryRequestAction());

    const result = await request({
      url: process.env['PUBLIC_URL'] + '/gallery',
      method: 'delete',
      data: { uuid },
    });

    dispatch(deleteGalleryRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteGalleryRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка при выполнении операции'
    }));
  }
}
