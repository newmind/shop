
import {
  PAGE_IN_PROCESS,

  GET_TYPES_REQUEST,
  GET_TYPES_REQUEST_FAIL,
  GET_TYPES_REQUEST_SUCCESS,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (status) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});

export const getCategoriesRequest = () => ({
  type: GET_CATEGORIES_REQUEST,
});
export const getCategoriesRequestFail = (error) => ({
  type: GET_CATEGORIES_REQUEST_FAIL,
  error,
});
export const getCategoriesRequestSuccess = (payload) => ({
  type: GET_CATEGORIES_REQUEST_SUCCESS,
  payload,
});


export const getTypesRequest = () => ({
  type: GET_TYPES_REQUEST,
});
export const getTypesRequestFail = (error) => ({
  type: GET_TYPES_REQUEST_FAIL,
  error,
});
export const getTypesRequestSuccess = (payload) => ({
  type: GET_TYPES_REQUEST_SUCCESS,
  payload,
});
