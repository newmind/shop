
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getMaterials } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {
    dispatch(getMaterials());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
