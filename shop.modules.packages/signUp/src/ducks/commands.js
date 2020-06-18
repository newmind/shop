
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcessAction,

  signUpRequestAction,
  signUpRequestFailAction,
  signUpRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
};

export const signUp = (formData) => async (dispatch) => {
  try {
    dispatch(signUpRequestAction());

    const result = await request({
      url: '/sign-up',
      method: 'post',
      data: formData,
    });

    console.log(result)

    dispatch(signUpRequestSuccessAction());
  }
  catch(error) {

    dispatch(signUpRequestFailAction(error));

    if (error['status'] === 400) {
      return dispatch(pushNotification({
        title: 'Ошибка регистрации',
        content: error['data']['error']['message'],
        mode: 'danger',
      }));
    }

    return dispatch(pushNotification({
      title: 'Ошибка регистрации',
      content: 'Что-то пошло не так',
      mode: 'danger',
    }));
  }
};
