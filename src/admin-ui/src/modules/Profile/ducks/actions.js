
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_REQUEST_FAIL,
  GET_PROFILE_REQUEST_SUCCESS,

  SAVE_PROFILE_REQUEST,
  SAVE_PROFILE_REQUEST_FAIL,
  SAVE_PROFILE_REQUEST_SUCCESS,
} from './types';
import {APPLICATION_GET_PROFILE_REQUEST_SUCCESS} from "../../../components/Application/ducks/types";


export const getProfileRequestAction = () => ({
  type: GET_PROFILE_REQUEST,
  payload: null,
});

export const getProfileRequestFailAction = (error) => ({
  type: GET_PROFILE_REQUEST_FAIL,
  payload: error,
});

export const getProfileRequestSuccessAction = (data) => ({
  type: GET_PROFILE_REQUEST_SUCCESS,
  payload: data,
});

export const saveProfileRequestAction = () => ({
  type: SAVE_PROFILE_REQUEST,
  payload: null,
});

export const saveProfileRequestFailAction = (error) => ({
  type: SAVE_PROFILE_REQUEST_FAIL,
  payload: error,
});

export const saveProfileRequestSuccessAction = (data) => ({
  type: SAVE_PROFILE_REQUEST_SUCCESS,
  payload: data,
});


export const applicationGetProfileRequestSuccessAction = (data) => ({
  type: APPLICATION_GET_PROFILE_REQUEST_SUCCESS,
  payload: data,
});
