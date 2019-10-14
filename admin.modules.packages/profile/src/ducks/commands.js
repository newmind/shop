
import request from '@ui.packages/request';

import {
  pageInProcess,

  getProfileRequestAction,
  getProfileRequestFailAction,
  getProfileRequestSuccessAction,

  saveProfileRequestAction,
  saveProfileRequestFailAction,
  saveProfileRequestSuccessAction,

  applicationGetProfileRequestSuccessAction,
} from './actions';


export const getProfile = () => async dispatch => {

  dispatch(pageInProcess(true));

  try {

    dispatch(getProfileRequestAction());

    const profile = await request({
      method: 'get',
      url: `/profile`,
    });

    dispatch(getProfileRequestSuccessAction(profile));

  } catch(error) {

    dispatch(getProfileRequestFailAction(error));
  }

  dispatch(pageInProcess(false));
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
    dispatch(applicationGetProfileRequestSuccessAction(profile));

  } catch(error) {

    dispatch(saveProfileRequestFailAction(error));
  }
};
