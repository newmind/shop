
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getCurrencies } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {
    dispatch(getCurrencies());
  },
  onUnmount({ dispatch }) {
    dispatch(resetStateAction());
  }
})(Component);
