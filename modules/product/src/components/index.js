
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';

import { resetStateAction } from '../ducks/slice';
import { getProductById } from '../ducks/commands';


export default function() {
  const dispatch = useDispatch();
  const params = useParams();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Товар`;

    await dispatch(getProductById(params['id']));
  });

  useUpdate(async function() {

  });

  useUnmount(function() {
    dispatch(resetStateAction());
  });

  return <Component />;
}
