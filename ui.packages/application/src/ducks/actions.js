
import {
  SIGN_OUT,
  APPLICATION_CHANGE_STATE,

  APPLICATION_AUTH_REQUEST,
  APPLICATION_AUTH_REQUEST_FAIL,
  APPLICATION_AUTH_REQUEST_SUCCESS,

  APPLICATION_GET_PROFILE_REQUEST,
  APPLICATION_GET_PROFILE_REQUEST_FAIL,
  APPLICATION_GET_PROFILE_REQUEST_SUCCESS,

  APPLICATION_SIG_OUT_REQUEST,
  APPLICATION_SIG_OUT_REQUEST_FAIL,
  APPLICATION_SIG_OUT_REQUEST_SUCCESS,
} from './types';


export const signOutAction = () => ({ type: SIGN_OUT, payload: null });

export const changeStateAction = (state) => ({ type: APPLICATION_CHANGE_STATE, payload: state });

export const applicationAuthRequestAction = () => ({ type: APPLICATION_AUTH_REQUEST, payload: null });
export const applicationAuthRequestFailAction = (error) => ({ type: APPLICATION_AUTH_REQUEST_FAIL, payload: error });
export const applicationAuthRequestSuccessAction = (data) => ({ type: APPLICATION_AUTH_REQUEST_SUCCESS, payload: data });

export const applicationGetProfileRequestAction = () => ({ type: APPLICATION_GET_PROFILE_REQUEST, payload: null });
export const applicationGetProfileRequestFailAction = () => ({ type: APPLICATION_GET_PROFILE_REQUEST_FAIL, payload: null });
export const applicationGetProfileRequestSuccessAction = (data) => ({ type: APPLICATION_GET_PROFILE_REQUEST_SUCCESS, payload: data });

export const applicationSignOutRequestAction = () => ({ type: APPLICATION_SIG_OUT_REQUEST, payload: null });
export const applicationSignOutRequestFailAction = (error) => ({ type: APPLICATION_SIG_OUT_REQUEST_FAIL, payload: error });
export const applicationSignOutRequestSuccessAction = () => ({ type: APPLICATION_SIG_OUT_REQUEST_SUCCESS, payload: null });
