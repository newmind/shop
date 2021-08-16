
import { resetStateAction, getShops } from '@modules/admin-shops';

import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Магазины`;

    await dispatch(getShops());
  });

  useUpdate(async function() {
    await dispatch(getShops());
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
