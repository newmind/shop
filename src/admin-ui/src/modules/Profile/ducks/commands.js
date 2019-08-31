
import request from '@ui.packages/request';

import {
  getProfileRequestAction,
  getProfileRequestFailAction,
  getProfileRequestSuccessAction,

  saveProfileRequestAction,
  saveProfileRequestFailAction,
  saveProfileRequestSuccessAction,
} from './actions';


export const getProfile = () => async dispatch => {
  try {

    dispatch(getProfileRequestAction());

    const profile = await request({
      method: 'get',
      url: '/profile',
    });

    dispatch(getProfileRequestSuccessAction(profile));

  } catch(error) {

    dispatch(getProfileRequestFailAction(error));
  }
};

export const saveProfile = (formData) => async dispatch => {
  try {

    dispatch(saveProfileRequestAction());

    const profile = await request({
      method: 'put',
      url: '/profile',
      data: formData,
    });

    dispatch(saveProfileRequestSuccessAction(profile));

  } catch(error) {

    dispatch(saveProfileRequestFailAction(error));
  }
};
