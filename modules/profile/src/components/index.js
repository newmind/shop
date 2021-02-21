
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getProfile } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    await dispatch(getProfile());
  });

  useUpdate(async function() {
    await dispatch(getProfile());
  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
