
import request from "@ui.packages/request";
import {pushNotification} from "@ui.packages/notifications";

import {
  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  createCommentRequestAction,
  createCommentRequestFailAction,
  createCommentRequestSuccessAction,
} from './slice';


export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch(getProductRequestAction());

    const result = await request({
      method: 'get',
      url: `/products/${id}`
    });

    dispatch(getProductRequestSuccessAction(result['data']));

    return data;
  }
  catch(error) {
    dispatch(getProductRequestFailAction(error));
  }
};


export const createComment = (productId, formData) => async dispatch => {
  try {
    dispatch(createCommentRequestAction());

    const result = await request({
      method: 'post',
      url: `/products/${productId}/comments`,
      data: formData,
    });

    dispatch(createCommentRequestSuccessAction(result['data']));
  }
  catch(error) {

    dispatch(createCommentRequestFailAction(error));
    dispatch(pushNotification({
      title: 'Ошибка при сохранении комментария',
      mode: 'danger',
    }));
  }
};
