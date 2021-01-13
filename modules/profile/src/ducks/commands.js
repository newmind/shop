
import request from '@ui.packages/request';

import {
  getProfileRequestAction,
  getProfileRequestFailAction,
  getProfileRequestSuccessAction,

  updateProfileRequestAction,
  updateProfileRequestFailAction,
  updateProfileRequestSuccessAction,
} from './slice';


export const getProfile = () => async dispatch => {
  try {
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
};

export const updateProfile = (formData) => async dispatch => {
  try {
    dispatch(updateProfileRequestAction());

    const { data } = await request({
      method: 'put',
      url: '/profile',
      data: formData,
    });

    dispatch(updateProfileRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(updateProfileRequestFailAction(error));
  }
};
