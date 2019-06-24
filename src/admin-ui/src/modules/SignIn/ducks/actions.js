
import {
  APPLICATION_AUTH_REQUEST,
  APPLICATION_AUTH_REQUEST_FAIL,
  APPLICATION_AUTH_REQUEST_SUCCESS,
} from './types';


export const applicationAuthRequestAction = () => ({
  type: APPLICATION_AUTH_REQUEST,
});

export const applicationAuthRequestFailAction = (error) => ({
  type: APPLICATION_AUTH_REQUEST_FAIL,
  payload: error,
});

export const applicationAuthRequestSuccessAction = (data) => ({
  type: APPLICATION_AUTH_REQUEST_SUCCESS,
  payload: data,
});
