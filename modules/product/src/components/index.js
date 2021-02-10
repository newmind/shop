
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { resetStateAction } from '../ducks/slice';
import { getProductById } from '../ducks/commands';


export default HOC({
  onMount({ dispatch, params }) {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Товар`;
    document.querySelector('meta[name="description"]').setAttribute("content", 'Товар');

    dispatch(getProductById(params['id']));
  },
  onUnmount({ dispatch }) {

    dispatch(resetStateAction());
  }
})(Component);
