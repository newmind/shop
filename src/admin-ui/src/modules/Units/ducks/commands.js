
import request from '@packages/request';
import { closeDialog } from '@packages/dialog';

import {
  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  createUnitsRequestAction,
  createUnitsRequestFailAction,
  createUnitsRequestSuccessAction,
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

    dispatch(createUnitsRequestAction());

    const result = await request({
      method: 'post',
      url: '/units',
      data: formData,
    });

    dispatch(createUnitsRequestSuccessAction(result));
    dispatch(closeDialog('unit-modify'));

  } catch(error) {

    dispatch(createUnitsRequestFailAction(error));
  }
};
