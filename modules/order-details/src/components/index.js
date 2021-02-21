
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';

import { getOperation } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();
  const params = useParams();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Детали заказа`;

    await dispatch(getOperation(params['id']));
  });

  useUpdate(async function() {

  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
