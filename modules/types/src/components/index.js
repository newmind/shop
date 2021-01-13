
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getTypes } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount: async ({ dispatch }) => {
    dispatch(getTypes());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
