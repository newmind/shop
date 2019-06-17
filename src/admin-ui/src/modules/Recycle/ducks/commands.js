
import request from '@packages/request';
import { closeDialog } from '@packages/dialog';

import {
  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  removeProductsRequestAction,
  removeProductsRequestFailAction,
  removeProductsRequestSuccessAction,
} from './actions';


export const getProducts = () => async dispatch => {
  try {

    dispatch(getProductsRequestAction());

    const result = await request({
      method: 'get',
      url: '/products',
      params: {
        status: 0,
      }
    });

    dispatch(getProductsRequestSuccessAction(result['items']));

  } catch(error) {
    dispatch(getProductsRequestFailAction());
  }
};

export const removeProductById = (id) => async dispatch => {
  try {

    dispatch(removeProductsRequestAction());

    await request({
      method: 'delete',
      url: `/products/${id}`,
    });

    dispatch(removeProductsRequestSuccessAction(id));
    dispatch(closeDialog('remove-confirm'));

  } catch(error) {
    console.log(error);
    dispatch(removeProductsRequestFailAction());
  }
};
