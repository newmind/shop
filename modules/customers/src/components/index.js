
import HOC from '@ui.packages/hoc';
// import { on, off } from "@ui.packages/socket";

import Component from './Component';

import { getCustomers } from '../ducks/commands';
import {
  resetStateAction,

  // createCustomerRequestSuccessAction,
  // updateCustomerRequestSuccessAction,
  // deleteCustomerRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {

    dispatch(getCustomers());

    // on(process.env['REACT_APP_SOCKET_CURRENCY_CREATE'], (data) => dispatch(createCustomerRequestSuccessAction(data)));
    // on(process.env['REACT_APP_SOCKET_CURRENCY_UPDATE'], (data) => dispatch(updateCustomerRequestSuccessAction(data)));
    // on(process.env['REACT_APP_SOCKET_CURRENCY_DELETE'], (data) => dispatch(deleteCustomerRequestSuccessAction(data)));
  },
  onUnmount({ dispatch }) {

    dispatch(resetStateAction());

    // off(process.env['REACT_APP_SOCKET_CURRENCY_CREATE']);
    // off(process.env['REACT_APP_SOCKET_CURRENCY_UPDATE']);
    // off(process.env['REACT_APP_SOCKET_CURRENCY_DELETE']);
  }
})(Component);
