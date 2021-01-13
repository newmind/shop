
import HOC from '@ui.packages/hoc';

import Component from './Component';

import {
  getTypes,
  getUnits,
  getColors,
  getCurrencies,
  getCategories,
  getMaterials,
  getForms,
  getProductById,
} from '../ducks/commands';

import { resetState } from '../ducks/slice';


export default HOC({
  onMount({ dispatch, params }) {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Редактирование товара`;

    if (params['id']) {
      dispatch(getProductById(params['id']));
    }

    dispatch(getTypes());
    dispatch(getUnits());
    dispatch(getForms());
    dispatch(getColors());
    dispatch(getMaterials());
    dispatch(getCurrencies());
    dispatch(getCategories());
  },
  onUnmount({ dispatch }) {
    dispatch(resetState());
  }
})(Component);
