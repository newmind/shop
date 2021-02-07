
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getOperations } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  combineEvents: true,
  async onMount({ dispatch }) {

    await dispatch(getOperations());
  },
  async onUnmount({ dispatch }) {

    await dispatch(resetStateAction());

  }
})(Component);
