
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getUnits } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {
    dispatch(getUnits());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
