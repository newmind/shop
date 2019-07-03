
import Cookies from 'js-cookie';
import { push } from 'react-router-redux';

import request from '@packages/request';


import {
  applicationAuthRequestAction,
  applicationAuthRequestFailAction,
  applicationAuthRequestSuccessAction,
} from './actions';


export const checkCookies = () => dispatch => {
  try {

    const cookies = Cookies.getJSON('admin');

    if (cookies) {
      dispatch(push('/'));
    }

  } catch(error) {

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

    dispatch(applicationAuthRequestFailAction(error));
  }
};
