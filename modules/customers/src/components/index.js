
// import { on, off } from "@ui.packages/socket";
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getCustomers } from '../ducks/commands';
import {
  resetStateAction,

  // createCustomerRequestSuccessAction,
  // updateCustomerRequestSuccessAction,
  // deleteCustomerRequestSuccessAction,
} from '../ducks/slice';
import {queryToObject} from "@ui.packages/utils";


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Клиенты`;

    const query = queryToObject(location['search']);
    await dispatch(getCustomers(query));

    // on(process.env['REACT_APP_SOCKET_CURRENCY_CREATE'], (data) => dispatch(createCustomerRequestSuccessAction(data)));
    // on(process.env['REACT_APP_SOCKET_CURRENCY_UPDATE'], (data) => dispatch(updateCustomerRequestSuccessAction(data)));
    // on(process.env['REACT_APP_SOCKET_CURRENCY_DELETE'], (data) => dispatch(deleteCustomerRequestSuccessAction(data)));
  });

  useUpdate(async function() {
    const query = queryToObject(location['search']);
    await dispatch(getCustomers(query));
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    // off(process.env['REACT_APP_SOCKET_CURRENCY_CREATE']);
    // off(process.env['REACT_APP_SOCKET_CURRENCY_UPDATE']);
    // off(process.env['REACT_APP_SOCKET_CURRENCY_DELETE']);
  });

  return <Component />;
}
