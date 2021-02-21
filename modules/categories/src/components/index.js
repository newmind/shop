
import { on, off } from '@ui.packages/socket';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getCategories } from '../ducks/commands';
import {
  resetStateAction,

  createCategoryRequestSuccessAction,
  updateCategoryRequestSuccessAction,
  deleteCategoryRequestSuccessAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Категория`;

    await dispatch(getCategories());

    on(process.env['REACT_APP_SOCKET_CATEGORY_CREATE'], (data) => dispatch(createCategoryRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CATEGORY_UPDATE'], (data) => dispatch(updateCategoryRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_CATEGORY_DELETE'], (data) => dispatch(deleteCategoryRequestSuccessAction(data)));
  });

  useUpdate(async function() {
    await dispatch(getCategories());
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_CATEGORY_CREATE']);
    off(process.env['REACT_APP_SOCKET_CATEGORY_UPDATE']);
    off(process.env['REACT_APP_SOCKET_CATEGORY_DELETE']);
  });

  return <Component />;
}
