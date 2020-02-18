
import request from '@ui.packages/request';
import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcessAction,

  getCommentsRequestAction,
  getCommentsRequestFailAction,
  getCommentsRequestSuccessAction,

  createCommentRequestAction,
  createCommentRequestFailAction,
  createCommentRequestSuccessAction,

  updateCommentRequestAction,
  updateCommentRequestFailAction,
  updateCommentRequestSuccessAction,

  deleteCommentsRequestAction,
  deleteCommentsRequestFailAction,
  deleteCommentsRequestSuccessAction,
} from './actions';


export const pageInProcess = (state) => (dispatch) => dispatch(pageInProcessAction(state));


export const getComments = () => async (dispatch) => {
  try {
    dispatch(getCommentsRequestAction());

    const result = await request({
      url: '/comments',
      method: 'get',
    });

    dispatch(getCommentsRequestSuccessAction(result));
  }
  catch(error) {

    dispatch(getCommentsRequestFailAction(error));
  }
};

// export const createProducts = (data) => async dispatch => {
//   try {
//
//     dispatch(createProductsRequestAction());
//
//     const result = await request({
//       method: 'post',
//       url: '/products',
//       data: data,
//     });
//
//     dispatch(createProductsRequestSuccessAction(result['data']));
//     dispatch(closeDialog());
//
//   } catch(error) {
//     dispatch(pushNotification({
//       type: 'Ошибка запроса',
//       message: error['message'],
//       mode: 'danger'
//     }));
//     dispatch(createProductsRequestFailAction());
//   }
// };

export const deleteComments = (id) => async (dispatch) => {
  try {
    dispatch(deleteCommentsRequestAction());

    const result = await request({
      method: 'delete',
      url: `/comments`,
      data: { id },
    });

    dispatch(deleteCommentsRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(deleteCommentsRequestFailAction(error));
  }
};
