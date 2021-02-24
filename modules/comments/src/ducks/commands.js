
import { UnauthorizedError } from '@packages/errors';

import request from '@ui.packages/request';

import {
  getCommentsRequestAction,
  getCommentsRequestFailAction,
  getCommentsRequestSuccessAction,

  removeCommentRequestAction,
  removeCommentRequestFailAction,
  removeCommentRequestSuccessAction,
} from './slice';


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

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
  }
};

// export const getComment = (id) => async (dispatch) => {
//   try {
//     dispatch(getCommentRequestAction());
//
//     const result = await request({
//       url: '/comments',
//       method: 'getAll',
//       params: { id },
//     });
//
//     dispatch(getCommentRequestSuccessAction(result));
//
//     return result['data'][0];
//   }
//   catch(error) {
//
//     dispatch(getCommentRequestFailAction(error));
//   }
// };

// export const updateComment = (formData) => async (dispatch) => {
//   try {
//     dispatch(updateCommentRequestAction());
//
//     const result = await request({
//       url: '/comments/' + formData['id'],
//       method: 'put',
//       data: formData,
//     });
//
//     dispatch(updateCommentRequestSuccessAction(result['data']));
//   }
//   catch(error) {
//
//     dispatch(updateCommentRequestFailAction(error));
//   }
// };

export const deleteComments = (id) => async (dispatch) => {
  try {
    dispatch(removeCommentRequestAction());

    const result = await request({
      method: 'delete',
      url: `/comments`,
      data: { id },
    });

    dispatch(removeCommentRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(removeCommentRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
  }
};
