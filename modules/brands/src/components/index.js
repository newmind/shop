
import HOC from '@ui.packages/hoc';
import { on, off } from "@ui.packages/socket";

import Component from './Component';

import { getBrands } from '../ducks/commands';
import {
  resetStateAction,

  createBrandRequestSuccessAction,
  updateBrandRequestSuccessAction,
  deleteBrandRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  async onMount({ dispatch }) {

    await dispatch(getBrands());

    on(process.env['REACT_APP_SOCKET_BRAND_CREATE'], (data) => dispatch(createBrandRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_BRAND_UPDATE'], (data) => dispatch(updateBrandRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_BRAND_DELETE'], (data) => dispatch(deleteBrandRequestSuccessAction(data)));
  },
  async onUpdate({ dispatch }) {

    await dispatch(getBrands());
  },
  onUnmount({ dispatch }) {

    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_BRAND_CREATE']);
    off(process.env['REACT_APP_SOCKET_BRAND_UPDATE']);
    off(process.env['REACT_APP_SOCKET_BRAND_DELETE']);
  }
})(Component);
