
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getOperations, getStatuses } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  combineEvents: true,
  async onMount({ dispatch }) {

    dispatch(getStatuses());
    dispatch(getOperations());
  },
  async onUnmount({ dispatch }) {

    await dispatch(resetStateAction());

  }
})(Component);
