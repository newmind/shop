
import {
  PAGE_IN_PROCESS,

  GET_OPERATIONS_REQUEST,
  GET_OPERATIONS_REQUEST_FAIL,
  GET_OPERATIONS_REQUEST_SUCCESS,

  GET_STATUSES_REQUEST,
  GET_STATUSES_REQUEST_FAIL,
  GET_STATUSES_REQUEST_SUCCESS,

  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_REQUEST_FAIL,
  UPDATE_STATUS_REQUEST_SUCCESS,
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

export const getStatusesRequestAction = () => ({
  type: GET_STATUSES_REQUEST,
  payload: null,
});
export const getStatusesRequestFailAction = (error) => ({
  type: GET_STATUSES_REQUEST_FAIL,
  error,
});
export const getStatusesRequestSuccessAction = (payload) => ({
  type: GET_STATUSES_REQUEST_SUCCESS,
  payload,
});


export const updateStatusRequestAction = (externalId) => ({
  type: UPDATE_STATUS_REQUEST,
  payload: externalId,
});
export const updateStatusRequestFailAction = (error) => ({
  type: UPDATE_STATUS_REQUEST_FAIL,
  error,
});
export const updateStatusRequestSuccessAction = (payload) => ({
  type: UPDATE_STATUS_REQUEST_SUCCESS,
  payload,
});
