
import request from '@packages/request';

import {
  getAllRequestAction,
  getAllRequestFaulAction,
  getAllRequestSuccessAction,

  createRequestAction,
  createRequestFaulAction,
  createRequestSuccessAction,

  updateRequestAction,
  updateRequestFaulAction,
  updateRequestSuccessAction,

  deleteRequestAction,
  deleteRequestFaulAction,
  deleteRequestSuccessAction,
} from './actions';


export const getAll = () => async dispatch => {
  try {

    dispatch(getAllRequestAction());

    const result = await request({
      method: 'get',
      url: '/category',
    });

    dispatch(getAllRequestSuccessAction(result['items']));

  } catch(error) {

    dispatch(getAllRequestFaulAction(error));
  }
};

export const create = (formData) => async dispatch => {
  try {

    dispatch(createRequestAction());

    const result = await request({
      method: 'post',
      url: `/category`,
      data: formData,
    });

    dispatch(createRequestSuccessAction(result));

  } catch(error) {

    dispatch(createRequestFaulAction(error));
  }
};

export const updateById = (formData) => async dispatch => {
  try {

    dispatch(updateRequestAction());

    const result = await request({
      method: 'put',
      url: `/category/${formData['id']}`,
      data: formData,
    });

    dispatch(updateRequestSuccessAction(result));

  } catch(error) {

    dispatch(updateRequestFaulAction(error));
  }
};

export const deleteById = (id) => async dispatch => {
  try {

    dispatch(deleteRequestAction());

    await request({
      method: 'delete',
      url: `/category/${id}`,
    });

    dispatch(deleteRequestSuccessAction(id));

  } catch(error) {

    dispatch(deleteRequestFaulAction(error));
  }
};
