
import { useMount, useUnmount, useUpdate } from "@ui.packages/hoc";
import { resetStateAction, restoreCartAction } from '@ui.packages/cart-widget';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getDeliveries, getPayments } from '../ducks/commands';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;

    dispatch(restoreCartAction());

    await dispatch(getPayments());
    await dispatch(getDeliveries());
  });

  useUpdate(async function() {

  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
