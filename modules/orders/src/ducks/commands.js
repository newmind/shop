
import request from '@ui.packages/request';

import {
  getItemsRequestAction,
  getItemsRequestFailAction,
  getItemsRequestSuccessAction,
} from './slice';


export const getOperations = () => async (dispatch) => {
  try {
    dispatch(getItemsRequestAction());

    const result = await request({
      url: '/operations',
      method: 'get',
    });

    dispatch(getItemsRequestSuccessAction(result));
  }
  catch (error) {

    dispatch(getItemsRequestFailAction(error));
  }
};
