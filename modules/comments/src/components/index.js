
import HOC from '@ui.packages/hoc';

import Component from './Component';

import { getComments } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default HOC({
  async onMount({ dispatch }) {

    await dispatch(getComments());
  },
  async onUpdate({ dispatch }) {

    await dispatch(getComments());
  },
  onUnmount({ dispatch }) {

    dispatch(resetStateAction());
  }
})(Component);
