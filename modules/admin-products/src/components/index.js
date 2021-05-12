
import { on, off } from '@ui.packages/socket';
import { queryToObject } from "@ui.packages/utils";
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Component from './Component';

import { getProducts, getPromotions } from '../ducks/commands';
import {
  resetState,
  updateProductsRequestSuccessAction,
  removeImageAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();
  const location = useLocation();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Каталог товаров`;

    const query = queryToObject(location['search']);

    await dispatch(getPromotions());
    await dispatch(getProducts(query));

    on(process.env['REACT_APP_SOCKET_PRODUCT_CREATE'], () => {});
    on(process.env['REACT_APP_SOCKET_PRODUCT_UPDATE'], (data) => dispatch(updateProductsRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_PRODUCT_DELETE'], () => {});

    on(process.env['REACT_APP_SOCKET_IMAGE_DELETE'], (data) => dispatch(removeImageAction(data)));
  });

  useUpdate(async function() {
    const query = queryToObject(location['search']);
    await dispatch(getProducts(query));
  });

  useUnmount(function() {
    dispatch(resetState());

    off(process.env['REACT_APP_SOCKET_PRODUCT_CREATE']);
    off(process.env['REACT_APP_SOCKET_PRODUCT_UPDATE']);
    off(process.env['REACT_APP_SOCKET_PRODUCT_DELETE']);

    off(process.env['REACT_APP_SOCKET_IMAGE_DELETE']);
  });

  return <Component />;
}
