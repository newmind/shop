
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getCategories } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {
    dispatch(getCategories());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
