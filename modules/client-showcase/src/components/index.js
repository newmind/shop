
import { queryToObject } from "@ui.packages/utils";
import { useMount, useUnmount, useUpdate } from "@ui.packages/hoc";

import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Component from './Component';

import { resetState } from '../ducks/slice';
import { getProducts } from '../ducks/commands';


export default function HOC() {
  const dispatch = useDispatch();
  const location = useLocation();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Витрина`;

    const query = queryToObject(location['search']);
    await dispatch(getProducts(query));
  });

  useUpdate(async function() {
    const query = queryToObject(location['search']);
    await dispatch(getProducts(query));
  });

  useUnmount(function() {
    dispatch(resetState());
  });

  return <Component />;
}
