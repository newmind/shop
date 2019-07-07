
import Cookies from 'js-cookie';
import { push } from 'react-router-redux';

import request from '@packages/request';
import { pushNotification } from '@packages/notifications';


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

    Cookies.set('admin', result);

    dispatch(push('/'));
    dispatch(applicationAuthRequestSuccessAction(result));

  } catch(error) {

    let message = '';

    if (error['status'] === 404) {
      message = 'Не верный логин или пароль';
    }

    dispatch(applicationAuthRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content:  message,
    }));
  }
};
