
import { on, off } from "@ui.packages/socket";
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getBrands } from '../ducks/commands';
import {
  resetStateAction,

  createBrandRequestSuccessAction,
  updateBrandRequestSuccessAction,
  deleteBrandRequestSuccessAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Производитель`;

    await dispatch(getBrands());

    on(process.env['REACT_APP_SOCKET_BRAND_CREATE'], (data) => dispatch(createBrandRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_BRAND_UPDATE'], (data) => dispatch(updateBrandRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_BRAND_DELETE'], (data) => dispatch(deleteBrandRequestSuccessAction(data)));
  });

  useUpdate(async function() {
    await dispatch(getBrands());
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_BRAND_CREATE']);
    off(process.env['REACT_APP_SOCKET_BRAND_UPDATE']);
    off(process.env['REACT_APP_SOCKET_BRAND_DELETE']);
  });

  return <Component />;
}
