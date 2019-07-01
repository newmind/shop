
import request from '@packages/request';
import { closeDialog } from '@packages/dialog';

import {
  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  createUnitRequestAction,
  createUnitRequestFailAction,
  createUnitRequestSuccessAction,

  removeUnitByIdRequestAction,
  removeUnitByIdRequestFailAction,
  removeUnitByIdRequestSuccessAction,

  updateUnitByIdRequestAction,
  updateUnitByIdRequestFailAction,
  updateUnitByIdRequestSuccessAction,
} from './actions';


export const getUnits = () => async dispatch => {
  try {

    dispatch(getUnitsRequestAction());

    const result = await request({
      method: 'get',
      url: '/units',
    });

    dispatch(getUnitsRequestSuccessAction(result['items']));

  } catch(error) {

    dispatch(getUnitsRequestFailAction(error));
  }
};


export const createUnit = (formData) => async dispatch => {
  try {

    dispatch(createUnitRequestAction());

    const result = await request({
      method: 'post',
      url: '/units',
      data: formData,
    });

    dispatch(createUnitRequestSuccessAction(result));
    dispatch(closeDialog('unit-modify'));

  } catch(error) {

    dispatch(createUnitRequestFailAction(error));
  }
};


export const removeUnitById = (unitId) => async dispatch => {
  try {

    dispatch(removeUnitByIdRequestAction());

    await request({
      method: 'delete',
      url: `/units/${unitId}`,
    });

    dispatch(removeUnitByIdRequestSuccessAction(unitId));
    dispatch(closeDialog('remove-confirm'));

  } catch(error) {

    dispatch(removeUnitByIdRequestFailAction(error));
  }
};


export const updateUnitById = (formData) => async dispatch => {
  try {

    dispatch(updateUnitByIdRequestAction());

    const result = await request({
      method: 'put',
      url: `/units/${formData['id']}`,
      data: formData,
    });

    dispatch(updateUnitByIdRequestSuccessAction(result));
    dispatch(closeDialog('unit-modify'));

  } catch(error) {

    dispatch(updateUnitByIdRequestFailAction(error));
  }
};
