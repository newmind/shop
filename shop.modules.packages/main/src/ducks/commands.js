
import request from "@ui.packages/request";

import {
  pageInProcessAction,

  getCategoriesRequest,
  getCategoriesRequestFail,
  getCategoriesRequestSuccess,
} from './actions';


export const pageInProcess = (status) => (dispatch) => dispatch(pageInProcessAction(status));


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