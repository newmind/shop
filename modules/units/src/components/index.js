
import { on, off } from '@ui.packages/socket';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getUnits } from '../ducks/commands';
import {
  resetStateAction,

  createUnitRequestSuccessAction,
  updateUnitRequestSuccessAction,
  deleteUnitRequestSuccessAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Единица измерения`;

    await dispatch(getUnits());

    on(process.env['REACT_APP_SOCKET_UNIT_CREATE'], (data) => dispatch(createUnitRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_UNIT_UPDATE'], (data) => dispatch(updateUnitRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_UNIT_DELETE'], (data) => dispatch(deleteUnitRequestSuccessAction(data)));
  });

  useUpdate(async function() {
    await dispatch(getUnits());
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_UNIT_CREATE']);
    off(process.env['REACT_APP_SOCKET_UNIT_UPDATE']);
    off(process.env['REACT_APP_SOCKET_UNIT_DELETE']);
  });

  return <Component />;
}
