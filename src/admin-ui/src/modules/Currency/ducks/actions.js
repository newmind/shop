
import {
  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_REQUEST_FAIL,
  GET_CURRENCIES_REQUEST_SUCCESS,

  GET_CURRENCY_REQUEST,
  GET_CURRENCY_REQUEST_FAIL,
  GET_CURRENCY_REQUEST_SUCCESS,

  ADD_CURRENCY_REQUEST,
  ADD_CURRENCY_REQUEST_FAIL,
  ADD_CURRENCY_REQUEST_SUCCESS,

  UPDATE_CURRENCY_REQUEST,
  UPDATE_CURRENCY_REQUEST_FAIL,
  UPDATE_CURRENCY_REQUEST_SUCCESS,

  DELETE_CURRENCY_REQUEST,
  DELETE_CURRENCY_REQUEST_FAIL,
  DELETE_CURRENCY_REQUEST_SUCCESS,
} from './types';


export const getAllRequestAction = () => ({
  type: GET_CURRENCIES_REQUEST,
});

export const getAllRequestFailAction = () => ({
  type: GET_CURRENCIES_REQUEST_FAIL,
});

export const getAllRequestSuccessAction = (data) => ({
  type: GET_CURRENCIES_REQUEST_SUCCESS,
  payload: data,
});


export const getByIdRequestAction = () => ({
  type: GET_CURRENCY_REQUEST,
  payload: null,
});

export const getByIdRequestFailAction = (error) => ({
  type: GET_CURRENCY_REQUEST_FAIL,
  payload: error,
});

export const getByIdRequestSuccessAction = (data) => ({
  type: GET_CURRENCY_REQUEST_SUCCESS,
  payload: data,
});


export const createRequestAction = () => ({
  type: ADD_CURRENCY_REQUEST,
});

export const createRequestFailAction = () => ({
  type: ADD_CURRENCY_REQUEST_FAIL,
});

export const createRequestSuccessAction = (data) => ({
  type: ADD_CURRENCY_REQUEST_SUCCESS,
  payload: data,
});


export const updateByIdRequestAction = () => ({
  type: UPDATE_CURRENCY_REQUEST,
  payload: null,
});

export const updateByIdRequestFailAction = error => ({
  type: UPDATE_CURRENCY_REQUEST_FAIL,
  payload: error,
});

export const updateByIdRequestSuccessAction = data => ({
  type: UPDATE_CURRENCY_REQUEST_SUCCESS,
  payload: data,
});


export const deleteByIdRequestAction = () => ({
  type: DELETE_CURRENCY_REQUEST,
  payload: null,
});

export const deleteByIdRequestFailAction = error => ({
  type: DELETE_CURRENCY_REQUEST_FAIL,
  payload: error,
});

export const deleteByIdRequestSuccessAction = data => ({
  type: DELETE_CURRENCY_REQUEST_SUCCESS,
  payload: data,
});
