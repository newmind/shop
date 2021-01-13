
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getComments } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {
    dispatch(getComments());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
