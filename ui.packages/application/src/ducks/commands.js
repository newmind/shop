
import request from "@ui.packages/request";
import { joinToRoom, leaveFromRoom } from '@ui.packages/socket';
import { pushNotification } from "@ui.packages/notifications";

import {
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
} from './slice';


export const changeState = (state) => async (dispatch) => {
  dispatch(changeStateAction(state));
};

export const getProfile = () => async (dispatch) => {
  try {
    dispatch(applicationGetProfileRequestAction());

    const { data } = await request({
      url: '/profile',
      method: 'get',
      data: {},
    });

    dispatch(applicationGetProfileRequestSuccessAction(data));
    joinToRoom(data['id']);

    return true;
  }
  catch(error) {

    dispatch(applicationGetProfileRequestFailAction());

    return false;
  }
};

export const signIn = (formData) => async (dispatch) => {
  try {
    dispatch(applicationAuthRequestAction());

    const result = await request({
      url: '/sign-in',
      method: 'post',
      data: {
        ...formData,
      }
    });

    dispatch(getProfile());
    dispatch(applicationAuthRequestSuccessAction(result));

    return true;
  }
  catch(error) {
console.log(123, error);
    const notification = {
      mode: '',
      title: '',
      content: '',
      autoClose: false,
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

    return false;
  }
};


export const signOut = (userId) => async (dispatch) => {
  try {
    dispatch(applicationSignOutRequestAction());

    await request({
      url: '/sign-out',
      method: 'post',
    });

    leaveFromRoom(userId);
    dispatch(applicationSignOutRequestSuccessAction());

    return true;
  }
  catch(error) {

    dispatch(applicationSignOutRequestFailAction(error));

    return false;
  }
};
