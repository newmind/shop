
import HOC from '@ui.packages/hoc';
import { on, off } from '@ui.packages/socket';

import Component from './Component';

import { getTypes, getCategories } from '../ducks/commands';
import {
  resetStateAction,

  createTypeRequestSuccessAction,
  updateTypeRequestSuccessAction,
  deleteTypeRequestSuccessAction,

  createCategoryRequestSuccessAction,
  updateCategoryRequestSuccessAction,
  deleteCategoryRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  async onMount({ dispatch }) {

    await dispatch(getCategories());
    await dispatch(getTypes());

    on(process.env['REACT_APP_SOCKET_TYPE_CREATE'], (data) => dispatch(createTypeRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_TYPE_UPDATE'], (data) => dispatch(updateTypeRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_TYPE_DELETE'], (data) => dispatch(deleteTypeRequestSuccessAction(data)));

    on(process.env['REACT_APP_SOCKET_CATEGORY_CREATE'], (data) => dispatch(createCategoryRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CATEGORY_UPDATE'], (data) => dispatch(updateCategoryRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CATEGORY_DELETE'], (data) => dispatch(deleteCategoryRequestSuccessAction(data)));
  },
  async onUnmount({ dispatch }) {

    await dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_TYPE_CREATE']);
    off(process.env['REACT_APP_SOCKET_TYPE_UPDATE']);
    off(process.env['REACT_APP_SOCKET_TYPE_DELETE']);

    off(process.env['REACT_APP_SOCKET_CATEGORY_CREATE']);
    off(process.env['REACT_APP_SOCKET_CATEGORY_UPDATE']);
    off(process.env['REACT_APP_SOCKET_CATEGORY_DELETE']);

  }
})(Component);
