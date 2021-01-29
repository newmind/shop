
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getTypes, getCategories } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount: async ({ dispatch }) => {
    await dispatch(getCategories());
    await dispatch(getTypes());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
