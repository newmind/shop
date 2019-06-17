
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,

  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_REQUEST_FAIL,
  CREATE_CATEGORY_REQUEST_SUCCESS,

  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST_FAIL,
  UPDATE_CATEGORY_REQUEST_SUCCESS,

  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST_FAIL,
  DELETE_CATEGORY_REQUEST_SUCCESS,
} from './types';


export const getAllRequestAction = () => ({
  type: GET_CATEGORIES_REQUEST,
  payload: null,
});

export const getAllRequestFaulAction = (error) => ({
  type: GET_CATEGORIES_REQUEST_FAIL,
  payload: error,
});

export const getAllRequestSuccessAction = (data) => {
  return {
    type: GET_CATEGORIES_REQUEST_SUCCESS,
    payload: data,
  }
};


export const createRequestAction = () => ({
  type: CREATE_CATEGORY_REQUEST,
  payload: null,
});

export const createRequestFaulAction = (error) => ({
  type: CREATE_CATEGORY_REQUEST_FAIL,
  payload: error,
});

export const createRequestSuccessAction = (data) => {
  return {
    type: CREATE_CATEGORY_REQUEST_SUCCESS,
    payload: data,
  }
};


export const updateRequestAction = () => ({
  type: UPDATE_CATEGORY_REQUEST,
  payload: null,
});

export const updateRequestFaulAction = (error) => ({
  type: UPDATE_CATEGORY_REQUEST_FAIL,
  payload: error,
});

export const updateRequestSuccessAction = (data) => {
  return {
    type: UPDATE_CATEGORY_REQUEST_SUCCESS,
    payload: data,
  }
};


export const deleteRequestAction = () => ({
  type: DELETE_CATEGORY_REQUEST,
  payload: null,
});

export const deleteRequestFaulAction = (error) => ({
  type: DELETE_CATEGORY_REQUEST_FAIL,
  payload: error,
});

export const deleteRequestSuccessAction = (data) => {
  return {
    type: DELETE_CATEGORY_REQUEST_SUCCESS,
    payload: data,
  }
};

