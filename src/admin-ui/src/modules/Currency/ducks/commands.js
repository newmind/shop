
import request from '@packages/request';

import {
  getAllRequestAction,
  getAllRequestFailAction,
  getAllRequestSuccessAction,

  getByIdRequestAction,
  getByIdRequestFailAction,
  getByIdRequestSuccessAction,

  createRequestAction,
  createRequestFailAction,
  createRequestSuccessAction,

  updateByIdRequestAction,
  updateByIdRequestFailAction,
  updateByIdRequestSuccessAction,

  deleteByIdRequestAction,
  deleteByIdRequestFailAction,
  deleteByIdRequestSuccessAction,
} from './actions';


export const getAll = () => async dispatch => {
  try {

    dispatch(getAllRequestAction());

    const result = await request({
      method: 'get',
      url: '/currency',
    });

    dispatch(getAllRequestSuccessAction(result['items']));

  } catch(error) {
    dispatch(getAllRequestFailAction(error));
  }
};

export const getById = (id) => async dispatch => {
  try {

    dispatch(getByIdRequestAction());

    const result = await request({
      method: 'get',
      url: `/currency/${id}`,
    });

    dispatch(getByIdRequestSuccessAction(result));

  } catch(error) {
    dispatch(getByIdRequestFailAction(error));
  }
};

export const create = (formData) => async dispatch => {
  try {

    dispatch(createRequestAction());

    const result = await request({
      method: 'post',
      url: '/currency',
      data: formData,
    });

    dispatch(createRequestSuccessAction(result));

  } catch(error) {
    dispatch(createRequestFailAction(error));
  }
};

export const updateById = (formData) => async dispatch => {
  try {

    dispatch(updateByIdRequestAction());

    const result = await request({
      method: 'put',
      url: `/currency/${formData['id']}`,
      data: formData,
    });

    dispatch(updateByIdRequestSuccessAction(result));

  } catch(error) {
    dispatch(updateByIdRequestFailAction());
  }
};

export const deleteById = (id) => async dispatch => {
  try {

    dispatch(deleteByIdRequestAction());

    await request({
      method: 'delete',
      url: `/currency/${id}`,
    });

    dispatch(deleteByIdRequestSuccessAction(id));

  } catch(error) {
    dispatch(deleteByIdRequestFailAction(error));
  }
};
