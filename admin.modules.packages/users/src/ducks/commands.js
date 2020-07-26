
import request from '@ui.packages/request';

import {
  pageInProcessAction,

  getUsersRequestAction,
  getUsersRequestFailAction,
  getUsersRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => {
  dispatch(pageInProcessAction(status));
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersRequestAction());

    const result = await request({
      url: '/users',
      method: 'get',
    });

    dispatch(getUsersRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(getUsersRequestFailAction());
  }
};
