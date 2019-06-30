
import {
  GET_UNITS_REQUEST,
  GET_UNITS_REQUEST_FAIL,
  GET_UNITS_REQUEST_SUCCESS,

  CREATE_UNIT_REQUEST,
  CREATE_UNIT_REQUEST_FAIL,
  CREATE_UNIT_REQUEST_SUCCESS,
} from './types';


export const getUnitsRequestAction = () => ({
  type: GET_UNITS_REQUEST,
  payload: null,
});

export const getUnitsRequestFailAction = (error) => ({
  type: GET_UNITS_REQUEST_FAIL,
  payload: error,
});

export const getUnitsRequestSuccessAction = (data) => ({
  type: GET_UNITS_REQUEST_SUCCESS,
  payload: data,
});


export const createUnitsRequestAction = () => ({
  type: CREATE_UNIT_REQUEST,
  payload: null,
});

export const createUnitsRequestFailAction = (error) => ({
  type: CREATE_UNIT_REQUEST_FAIL,
  payload: error,
});

export const createUnitsRequestSuccessAction = (data) => ({
  type: CREATE_UNIT_REQUEST_SUCCESS,
  payload: data,
});

