
import {
  APPLICATION_CHANGE_STATE,

  APPLICATION_GET_PROFILE_REQUEST,
  APPLICATION_GET_PROFILE_REQUEST_FAIL,
  APPLICATION_GET_PROFILE_REQUEST_SUCCESS,
} from './types';


export const changeStateAction = state => {
  return{
    type: APPLICATION_CHANGE_STATE,
    payload: state,
  }
};

export const applicationGetProfileRequestAction = () => ({
  type: APPLICATION_GET_PROFILE_REQUEST,
  payload: null,
});

export const applicationGetProfileRequestFailAction = () => ({
  type: APPLICATION_GET_PROFILE_REQUEST_FAIL,
  payload: null,
});

export const applicationGetProfileRequestSuccessAction = (data) => ({
  type: APPLICATION_GET_PROFILE_REQUEST_SUCCESS,
  payload: data,
});