
import HOC from '@ui.packages/hoc';
import { on, off } from '@ui.packages/socket';

import Component from './Component';

import { getCategories } from '../ducks/commands';
import {
  resetStateAction,

  createCategoryRequestSuccessAction,
  updateCategoryRequestSuccessAction,
  deleteCategoryRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  async onMount({ dispatch }) {

    await dispatch(getCategories());

    on(process.env['REACT_APP_SOCKET_CATEGORY_CREATE'], (data) => dispatch(createCategoryRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CATEGORY_UPDATE'], (data) => dispatch(updateCategoryRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CATEGORY_DELETE'], (data) => dispatch(deleteCategoryRequestSuccessAction(data)));

  },
  async onUpdate({ dispatch }) {

    await dispatch(getCategories());
  },
  async onUnmount({ dispatch }) {

    await dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_CATEGORY_CREATE']);
    off(process.env['REACT_APP_SOCKET_CATEGORY_UPDATE']);
    off(process.env['REACT_APP_SOCKET_CATEGORY_DELETE']);
  }
})(Component);
