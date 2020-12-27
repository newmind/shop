
import request from "@ui.packages/request";
import {pushNotification} from "@ui.packages/notifications";

import {
  pageInProcessAction,

  addProductToCartAction,
  removeProductFromCartAction,

  getProductByIdRequest,
  getProductByIdRequestFail,
  getProductByIdRequestSuccess,

  createCommentRequestAction,
  createCommentRequestFailAction,
  createCommentRequestSuccessAction,
} from './actions';


export const pageInProcess = (status) => (dispatch) => dispatch(pageInProcessAction(status));


export const addProductToCart = (product) => (dispatch) => dispatch(addProductToCartAction(product));
export const removeProductFromCart = (id) => (dispatch) => dispatch(removeProductFromCartAction(id));


export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch(getProductByIdRequest());

    const { data } = await request({
      method: 'get',
      url: `/products/${id}`
    });

    console.log(data)

    dispatch(getProductByIdRequestSuccess(data));

    return data;
  }
  catch(error) {
console.log(error)
    dispatch(getProductByIdRequestFail(error));
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
