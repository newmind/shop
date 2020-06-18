
import {
  PAGE_IN_PROCESS,

  SIGN_UP_REQUEST,
  SIGN_UP_REQUEST_FAIL,
  SIGN_UP_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (status) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});


export const signUpRequestAction = () => ({
  type: SIGN_UP_REQUEST,
});
export const signUpRequestFailAction = (error) => ({
  type: SIGN_UP_REQUEST_FAIL,
  error,
});
export const signUpRequestSuccessAction = (payload) => ({
  type: SIGN_UP_REQUEST_SUCCESS,
  payload,
});
