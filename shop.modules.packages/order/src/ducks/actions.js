
import {
  PAGE_IN_PROCESS,

  CREATE_OPERATION_REQUEST,
  CREATE_OPERATION_REQUEST_FAIL,
  CREATE_OPERATION_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (status) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});


export const createOperationRequestAction = () => ({
  type: CREATE_OPERATION_REQUEST,
  payload: null,
});

export const createOperationRequestFailAction = (error) => ({
  type: CREATE_OPERATION_REQUEST_FAIL,
  payload: error,
});

export const createOperationRequestSuccessAction = (data) => ({
  type: CREATE_OPERATION_REQUEST_SUCCESS,
  payload: data,
});
