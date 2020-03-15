
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
  try {
    dispatch(pageInProcess(true));
    dispatch(getProfileRequestAction());

    const { data } = await request({
      method: 'get',
      url: `/profile`,
    });

    dispatch(getProfileRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getProfileRequestFailAction(error));
  }
  finally {
    dispatch(pageInProcess(false));
  }
};

export const saveProfile = (formData) => async dispatch => {
  try {
    dispatch(saveProfileRequestAction());

    const { data } = await request({
      method: 'put',
      url: '/profile',
      data: formData,
    });

    dispatch(saveProfileRequestSuccessAction(data));
    dispatch(applicationGetProfileRequestSuccessAction(data));
  }
  catch(error) {

    dispatch(saveProfileRequestFailAction(error));
  }
};
