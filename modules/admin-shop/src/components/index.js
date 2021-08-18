
import { resetStateAction, getShop, getDeliveries, getPayments } from '@modules/admin-shop';

import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();
  const params = useParams();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Магазин`;

    await dispatch(getPayments());
    await dispatch(getDeliveries());

    if (params['uuid']) {
      await dispatch(getShop(params['uuid']));
    }
  });

  useUpdate(async function() {
    await dispatch(getPayments());
    await dispatch(getDeliveries());

    if (params['uuid']) {
      await dispatch(getShop(params['uuid']));
    }
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
