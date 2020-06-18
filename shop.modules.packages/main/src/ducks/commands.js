
import request from "@ui.packages/request";

import {
  pageInProcessAction,

  getTypesRequest,
  getTypesRequestFail,
  getTypesRequestSuccess,

  getCategoriesRequest,
  getCategoriesRequestFail,
  getCategoriesRequestSuccess,
} from './actions';


export const pageInProcess = (status) => (dispatch) => dispatch(pageInProcessAction(status));


export const getTypes = () => async (dispatch) => {
  try {
    dispatch(getTypesRequest());

    const result = await request({
      url: '/types',
    });

    dispatch(getTypesRequestSuccess(result['data']));
  }
  catch(error) {

    dispatch(getTypesRequestFail(error));
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoriesRequest());

    const result = await request({
      url: '/categories',
    });

    dispatch(getCategoriesRequestSuccess(result['data']));
  }
  catch(error) {

    dispatch(getCategoriesRequestFail());
  }
};