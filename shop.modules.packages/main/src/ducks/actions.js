
import {
  PAGE_IN_PROCESS,

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
