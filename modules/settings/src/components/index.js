
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getSettings } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    await dispatch(getSettings());
  });

  useUpdate(async function() {
    await dispatch(getSettings());
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
