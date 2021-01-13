
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getColors } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {
    dispatch(getColors());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
