
import {
  PAGE_IN_PROCESS,

  GET_OPERATION_BY_ID_REQUEST,
  GET_OPERATION_BY_ID_REQUEST_FAIL,
  GET_OPERATION_BY_ID_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (status) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});

export const getOperationByIdRequestAction = () => ({
  type: GET_OPERATION_BY_ID_REQUEST,
  payload: null,
});

export const getOperationByIdRequestFailAction = (error) => ({
  type: GET_OPERATION_BY_ID_REQUEST_FAIL,
  payload: error,
});

export const getOperationByIdRequestSuccessAction = (data) => ({
  type: GET_OPERATION_BY_ID_REQUEST_SUCCESS,
  payload: data,
});

