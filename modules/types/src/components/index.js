
import HOC from '@ui.packages/hoc';
import { on, off } from '@ui.packages/socket';

import Component from './Component';

import { getTypes } from '../ducks/commands';
import {
  resetStateAction,

  createTypeRequestSuccessAction,
  updateTypeRequestSuccessAction,
  deleteTypeRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  async onMount({ dispatch }) {

    await dispatch(getTypes());

    on(process.env['REACT_APP_SOCKET_TYPE_CREATE'], (data) => dispatch(createTypeRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_TYPE_UPDATE'], (data) => dispatch(updateTypeRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_TYPE_DELETE'], (data) => dispatch(deleteTypeRequestSuccessAction(data)));
  },
  async onUnmount({ dispatch }) {

    await dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_TYPE_CREATE']);
    off(process.env['REACT_APP_SOCKET_TYPE_UPDATE']);
    off(process.env['REACT_APP_SOCKET_TYPE_DELETE']);
  }
})(Component);
