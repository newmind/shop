
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,

  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REQUEST_FAIL,
  GET_PRODUCT_REQUEST_SUCCESS,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_FAIL,
  UPDATE_PRODUCT_REQUEST_SUCCESS,

  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_FAIL,
  CREATE_PRODUCT_REQUEST_SUCCESS,
} from './types';


export const openDialogAction = () => ({
  type: OPEN_DIALOG,
});

export const closeDialogAction = () => ({
  type: CLOSE_DIALOG,
});


export const getProductRequestAction = () => ({
  type: GET_PRODUCT_REQUEST,
});

export const getProductRequestFailAction = () => ({
  type: GET_PRODUCT_REQUEST_FAIL,
});

export const getProductRequestSuccessAction = (data) => {
  return {
    type: GET_PRODUCT_REQUEST_SUCCESS,
    payload: data,
  }
};


export const updateProductRequestAction = () => ({
  type: UPDATE_PRODUCT_REQUEST,
});

export const updateProductRequestFailAction = () => ({
  type: UPDATE_PRODUCT_REQUEST_FAIL,
});

export const updateProductRequestSuccessAction = (data) => {
  return {
    type: UPDATE_PRODUCT_REQUEST_SUCCESS,
    payload: data,
  }
};

export const createProductRequestAction = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

export const createProductRequestFailAction = () => ({
  type: CREATE_PRODUCT_REQUEST_FAIL,
});

export const createProductRequestSuccessAction = (data) => ({
  type: CREATE_PRODUCT_REQUEST_SUCCESS,
  payload: data,
});
