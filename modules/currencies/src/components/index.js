
import { on, off } from "@ui.packages/socket";
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getCurrencies } from '../ducks/commands';
import {
  resetStateAction,

  createCurrencyRequestSuccessAction,
  updateCurrencyRequestSuccessAction,
  deleteCurrencyRequestSuccessAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Валюта`;

    await dispatch(getCurrencies());

    on(process.env['REACT_APP_SOCKET_CURRENCY_CREATE'], (data) => dispatch(createCurrencyRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CURRENCY_UPDATE'], (data) => dispatch(updateCurrencyRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CURRENCY_DELETE'], (data) => dispatch(deleteCurrencyRequestSuccessAction(data)));
  });

  useUpdate(async function() {
    await dispatch(getCurrencies());
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_CURRENCY_CREATE']);
    off(process.env['REACT_APP_SOCKET_CURRENCY_UPDATE']);
    off(process.env['REACT_APP_SOCKET_CURRENCY_DELETE']);
  });

  return <Component />;
}
