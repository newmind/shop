
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getForms } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {
    dispatch(getForms());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
