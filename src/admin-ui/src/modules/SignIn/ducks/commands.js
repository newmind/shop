
import Cookies from 'js-cookie';
import { push } from 'react-router-redux';

import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';


import {
  applicationAuthRequestAction,
  applicationAuthRequestFailAction,
  applicationAuthRequestSuccessAction,
} from './actions';


export const checkCookies = () => dispatch => {

  const cookies = Cookies.getJSON('admin');

  if (cookies) {
    dispatch(push('/'));
  }
};

export const signIn = (formData) => async dispatch => {
  try {

    dispatch(applicationAuthRequestAction());

    const result = await request({
      url: '/sign-in',
      method: 'post',
      data: {
        ...formData,
      }
    });

    dispatch(applicationAuthRequestSuccessAction(result));
    dispatch(push('/'));

  } catch(error) {

    let message = '';

    if (error['status'] === 404) {
      message = 'Не верный логин или пароль';
    } else if (error['status'] === 500) {
      message = 'Непредвиденная ошибка';
    }

    dispatch(applicationAuthRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content:  message,
    }));
  }
};
