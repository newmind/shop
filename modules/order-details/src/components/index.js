
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getOperation } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount({ dispatch, params }) {
    dispatch(getOperation(params['id']));
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
