
import request from "@ui.packages/request";
import { openDialog } from '@ui.packages/dialog';
import { pushNotification } from "@ui.packages/notifications";
import { instance, joinToRoom, connect, disconnect } from '@ui.packages/socket';

import {
  signOutAction,
  changeStateAction,

  applicationAuthRequestAction,
  applicationAuthRequestFailAction,
  applicationAuthRequestSuccessAction,

  applicationGetProfileRequestAction,
  applicationGetProfileRequestFailAction,
  applicationGetProfileRequestSuccessAction,

  applicationSignOutRequestAction,
  applicationSignOutRequestFailAction,
  applicationSignOutRequestSuccessAction,
} from './actions';


export const changeState = (state) => async (dispatch) => dispatch(changeStateAction(state));

export const getProfile = () => async (dispatch) => {
  try {
    dispatch(applicationGetProfileRequestAction());

    const profile = await request({
      url: '/profile',
      method: 'get',
      data: {},
    });

    dispatch(applicationGetProfileRequestSuccessAction(profile));
    joinToRoom(profile['id']);
  }
  catch(error) {

    dispatch(applicationGetProfileRequestFailAction());
  }
};

export const signIn = (formData) => async dispatch => {
  try {
    dispatch(applicationAuthRequestAction());

    const result = await request({
      url: '/sign-in',
      method: 'post',
      data: formData,
    });

    dispatch(getProfile());

    const socketInstance = instance();

    if ( ! socketInstance.connected) {
      connect();
    }

    joinToRoom(result['id']);

    dispatch(applicationAuthRequestSuccessAction(result));
  }
  catch(error) {

    const notification = {
      mode: '',
      title: '',
      content: '',
    };

    if (error['status'] === 404) {
      notification['mode'] = 'warning';
      notification['title'] = 'Ошибка авторизации';
      notification['content'] = 'Не верный логин или пароль';
    }
    else if (error['status'] === 500) {
      notification['mode'] = 'danger';
      notification['title'] = 'Ошибка доступа';
      notification['content'] = `${error['data']['message']} (${error['data']['code']})`;
    }

    dispatch(pushNotification(notification));
    dispatch(applicationAuthRequestFailAction(error));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    dispatch(applicationSignOutRequestAction());

    await request({
      url: '/sign-out',
      method: 'post'
    });

    disconnect();

    dispatch(signOutAction());
    dispatch(applicationSignOutRequestSuccessAction());
  }
  catch(error) {

    dispatch(applicationSignOutRequestFailAction(error));
  }
};

export const signDialog = () => async (dispatch) => {
  dispatch(openDialog('sign-in'));
};
