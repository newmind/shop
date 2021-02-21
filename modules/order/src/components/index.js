
import { useMount, useUnmount, useUpdate } from "@ui.packages/hoc";

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { resetStateAction, restoreStateAction } from '../ducks/slice';
import { getProducts, getAmount, getDeliveries, getPayments } from '../ducks/commands';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Оформление заказа`;

    dispatch(restoreStateAction());

    const cart = window.localStorage.getItem('cart');
    const uuid = JSON.parse(cart) || [];

    if (uuid.length) {
      await dispatch(getProducts(uuid));
      await dispatch(getAmount(uuid));

      await dispatch(getPayments());
      await dispatch(getDeliveries());
    }
  });

  useUpdate(async function() {

  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
