
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
export const getCategoriesRequestFail = () => ({
  type: GET_CATEGORIES_REQUEST_FAIL,
});
export const getCategoriesRequestSuccess = (data) => ({
  type: GET_CATEGORIES_REQUEST_SUCCESS,
  payload: data,
});
