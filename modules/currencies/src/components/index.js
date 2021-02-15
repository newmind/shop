
import HOC from '@ui.packages/hoc';
import { on, off } from "@ui.packages/socket";

import Component from './Component';

import { getCurrencies } from '../ducks/commands';
import {
  resetStateAction,

  createCurrencyRequestSuccessAction,
  updateCurrencyRequestSuccessAction,
  deleteCurrencyRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  async onMount({ dispatch }) {

    await dispatch(getCurrencies());

    on(process.env['REACT_APP_SOCKET_CURRENCY_CREATE'], (data) => dispatch(createCurrencyRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CURRENCY_UPDATE'], (data) => dispatch(updateCurrencyRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CURRENCY_DELETE'], (data) => dispatch(deleteCurrencyRequestSuccessAction(data)));
  },
  async onUpdate({ dispatch }) {

    await dispatch(getCurrencies());
  },
  onUnmount({ dispatch }) {

    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_CURRENCY_CREATE']);
    off(process.env['REACT_APP_SOCKET_CURRENCY_UPDATE']);
    off(process.env['REACT_APP_SOCKET_CURRENCY_DELETE']);
  }
})(Component);
