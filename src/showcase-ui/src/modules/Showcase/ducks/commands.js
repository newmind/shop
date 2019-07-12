
import request from '@ui.packages/request';

import {
  addProductToCartAction,

  openDialogAction,
  closeDialogAction,

  getProductsRequest,
  getProductsRequestFail,
  getProductsRequestSuccess,

  getAdditionalDataRequestAction,
  getAdditionalDataRequestFailAction,
  getAdditionalDataRequestSuccessAction,
} from './actions';


export const addProductToCart = (product) => dispatch => {
  dispatch(addProductToCartAction(product));
};

export const openDialog = (product) => dispatch => {
  dispatch(openDialogAction(product));
};

export const closeDialog = () => dispatch => {
  dispatch(closeDialogAction());
};


export const getProducts = (params) => async dispatch => {
  try {

    dispatch(getProductsRequest());

    const result = await request({
      url: '/products',
      params: params,
    });

    dispatch(getProductsRequestSuccess(result));

  } catch(error) {
    dispatch(getProductsRequestFail(error));
  }
};

export const getDataForFilter = () => async dispatch => {
  try {

    dispatch(getAdditionalDataRequestAction());

    const result = await request({
      method: 'get',
      url: '/products/additional-data'
    });

    dispatch(getAdditionalDataRequestSuccessAction(result));

  } catch (error) {

    dispatch(getAdditionalDataRequestFailAction(error));
  }
};
