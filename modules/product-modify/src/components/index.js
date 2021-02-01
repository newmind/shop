
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getBrands, getTypes, getCurrencies, getCategories, getAttributes, getProductById } from '../ducks/commands';

import { resetState } from '../ducks/slice';


export default HOC({
  async onMount({ dispatch, params }) {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Редактирование товара`;

    await dispatch(getTypes());
    await dispatch(getBrands());
    await dispatch(getCategories());
    await dispatch(getCurrencies());
    await dispatch(getAttributes());

    if (params['id']) {
      await dispatch(getProductById(params['id']));
    }
  },
  onUnmount({ dispatch }) {
    dispatch(resetState());
  }
})(Component);
