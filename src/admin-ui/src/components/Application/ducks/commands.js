
import { push } from 'react-router-redux';

import request from "@ui.packages/request";

import {
  signOutAction,
  changeStateAction,

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

    const profile = await request({
      url: '/profile',
      method: 'get',
      data: {},
    });

    dispatch(applicationGetProfileRequestSuccessAction(profile));

  } catch(error) {

    dispatch(applicationGetProfileRequestFailAction());
    dispatch(push('/sign-in'));
  }
};

export const signOut = () => async (dispatch) => {
  try {

    dispatch(applicationSignOutRequestAction());

    await request({
      url: '/sign-out',
      method: 'post'
    });

    dispatch(signOutAction());
    dispatch(applicationSignOutRequestSuccessAction());
    dispatch(push('/sign-in'));

  } catch(error) {

    dispatch(applicationSignOutRequestFailAction(error));
  }
};
