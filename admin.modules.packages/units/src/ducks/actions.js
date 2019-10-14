
import {
  PAGE_IN_PROCESS,

  GET_UNITS_REQUEST,
  GET_UNITS_REQUEST_FAIL,
  GET_UNITS_REQUEST_SUCCESS,

  CREATE_UNIT_REQUEST,
  CREATE_UNIT_REQUEST_FAIL,
  CREATE_UNIT_REQUEST_SUCCESS,

  REMOVE_UNIT_REQUEST,
  REMOVE_UNIT_REQUEST_FAIL,
  REMOVE_UNIT_REQUEST_SUCCESS,

  UPDATE_UNIT_REQUEST,
  UPDATE_UNIT_REQUEST_FAIL,
  UPDATE_UNIT_REQUEST_SUCCESS,
} from './types';


export const pageInProcess = (status = true) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});

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


export const createUnitRequestAction = () => ({
  type: CREATE_UNIT_REQUEST,
  payload: null,
});

export const createUnitRequestFailAction = (error) => ({
  type: CREATE_UNIT_REQUEST_FAIL,
  payload: error,
});

export const createUnitRequestSuccessAction = (data) => ({
  type: CREATE_UNIT_REQUEST_SUCCESS,
  payload: data,
});


export const removeUnitByIdRequestAction = () => ({
  type: REMOVE_UNIT_REQUEST,
  payload: null,
});

export const removeUnitByIdRequestFailAction = (error) => ({
  type: REMOVE_UNIT_REQUEST_FAIL,
  payload: error,
});

export const removeUnitByIdRequestSuccessAction = (unitId) => ({
  type: REMOVE_UNIT_REQUEST_SUCCESS,
  payload: unitId,
});


export const updateUnitByIdRequestAction = () => ({
  type: UPDATE_UNIT_REQUEST,
  payload: null,
});

export const updateUnitByIdRequestFailAction = (error) => ({
  type: UPDATE_UNIT_REQUEST_FAIL,
  payload: error,
});

export const updateUnitByIdRequestSuccessAction = (data) => ({
  type: UPDATE_UNIT_REQUEST_SUCCESS,
  payload: data,
});

