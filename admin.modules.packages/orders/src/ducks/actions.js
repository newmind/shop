
import {
  PAGE_IN_PROCESS,

  GET_OPERATIONS_REQUEST,
  GET_OPERATIONS_REQUEST_FAIL,
  GET_OPERATIONS_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (status = true) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});


export const getOperationsRequestAction = () => ({
  type: GET_OPERATIONS_REQUEST,
  payload: null,
});

export const getOperationsRequestFailAction = (error) => ({
  type: GET_OPERATIONS_REQUEST_FAIL,
  payload: error,
});

export const getOperationsRequestSuccessAction = (data) => ({
  type: GET_OPERATIONS_REQUEST_SUCCESS,
  payload: data,
});