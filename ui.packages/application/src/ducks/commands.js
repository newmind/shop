
import request from "@ui.packages/request";
import { pushNotification } from "@ui.packages/notifications";
// import { instance, joinToRoom, connect, disconnect } from '@ui.packages/socket';

import { useNavigate } from 'react-router-dom';

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
    // joinToRoom(data['id']);

    return true;
  }
  catch(error) {

    dispatch(applicationGetProfileRequestFailAction());

    return false;
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

    dispatch(getProfile());

    // const socketInstance = instance();

    // if ( ! socketInstance.connected) {
    //   connect();
    // }

    // joinToRoom(result['id']);

    dispatch(applicationAuthRequestSuccessAction(result));

    return true;
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
      notification['content'] = `${error['data']['error']['message']} (${error['data']['error']['code']})`;
    }

    dispatch(pushNotification(notification));
    dispatch(applicationAuthRequestFailAction(error));

    return false;
  }
};


export const signOut = () => async (dispatch) => {
  const navigate = useNavigate();

  try {

    dispatch(applicationSignOutRequestAction());

    await request({
      url: '/sign-out',
      method: 'post'
    });

    disconnect();

    dispatch(signOutAction());
    dispatch(applicationSignOutRequestSuccessAction());

    navigate('/sign-in');
  }
  catch(error) {

    dispatch(applicationSignOutRequestFailAction(error));
  }
};
