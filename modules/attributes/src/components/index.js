
import HOC from '@ui.packages/hoc';
import { on, off } from '@ui.packages/socket';

import Component from './Component';

import { getItems, getUnits } from '../ducks/commands';
import {
  resetStateAction,

  createItemRequestSuccessAction,
  updateItemRequestSuccessAction,
  deleteItemRequestSuccessAction,

  createUnitRequestSuccessAction,
  updateUnitRequestSuccessAction,
  deleteUnitRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  async onMount({ dispatch }) {

    await dispatch(getItems());
    await dispatch(getUnits());

    on(process.env['REACT_APP_SOCKET_ATTRIBUTE_CREATE'], (data) => dispatch(createItemRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_ATTRIBUTE_UPDATE'], (data) => dispatch(updateItemRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_ATTRIBUTE_DELETE'], (data) => dispatch(deleteItemRequestSuccessAction(data)));

    on(process.env['REACT_APP_SOCKET_UNIT_CREATE'], (data) => dispatch(createUnitRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_UNIT_UPDATE'], (data) => dispatch(updateUnitRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_UNIT_DELETE'], (data) => dispatch(deleteUnitRequestSuccessAction(data)));

  },
  async onUnmount({ dispatch }) {
    await dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_ATTRIBUTE_CREATE']);
    off(process.env['REACT_APP_SOCKET_ATTRIBUTE_UPDATE']);
    off(process.env['REACT_APP_SOCKET_ATTRIBUTE_DELETE']);

    off(process.env['REACT_APP_SOCKET_UNIT_CREATE']);
    off(process.env['REACT_APP_SOCKET_UNIT_UPDATE']);
    off(process.env['REACT_APP_SOCKET_UNIT_DELETE']);
  }
})(Component);
