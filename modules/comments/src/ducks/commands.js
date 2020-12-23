
import request from '@ui.packages/request';
// import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcessAction,

  getCommentRequestAction,
  getCommentRequestFailAction,
  getCommentRequestSuccessAction,

  getCommentsRequestAction,
  getCommentsRequestFailAction,
  getCommentsRequestSuccessAction,

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

export const getComment = (id) => async (dispatch) => {
  try {
    dispatch(getCommentRequestAction());

    const result = await request({
      url: '/comments',
      method: 'get',
      params: { id },
    });

    dispatch(getCommentRequestSuccessAction(result));

    return result['data'][0];
  }
  catch(error) {

    dispatch(getCommentRequestFailAction(error));
  }
};

export const updateComment = (formData) => async (dispatch) => {
  try {
    dispatch(updateCommentRequestAction());

    const result = await request({
      url: '/comments/' + formData['id'],
      method: 'put',
      data: formData,
    });

    dispatch(updateCommentRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(updateCommentRequestFailAction(error));
  }
};

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
