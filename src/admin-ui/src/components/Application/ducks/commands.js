
import { push } from 'react-router-redux';

import request from "@ui.packages/request";

import {
  changeStateAction,

  applicationGetProfileRequestAction,
  applicationGetProfileRequestFailAction,
  applicationGetProfileRequestSuccessAction,
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
    dispatch(push('/'));

  } catch(error) {

    const { status } = error;

    if (status === 404) {
      dispatch(push('/error404'));
    } else {
      dispatch(push('/sign-in'));
    }

    dispatch(applicationGetProfileRequestFailAction());
  }
};