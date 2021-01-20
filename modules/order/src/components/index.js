
import HOC from "@ui.packages/hoc";

import Component from './Component';

import { resetState } from '../ducks/slice';


export default HOC({
  onMount: () => {

    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;
    document.querySelector('meta[name="description"]').setAttribute('content', '');
  },
  onUnmount({ dispatch }) {

    dispatch(resetState());
  }
})(Component);
