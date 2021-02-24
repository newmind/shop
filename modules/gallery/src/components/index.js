
// import { on, off } from '@ui.packages/socket';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getGallery } from '../ducks/commands';
import { resetStateAction } from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Галерея`;

    await dispatch(getGallery());

    // on(process.env['REACT_APP_SOCKET_TYPE_CREATE'], (data) => dispatch(createTypeRequestSuccessAction(data)));
    // on(process.env['REACT_APP_SOCKET_TYPE_UPDATE'], (data) => dispatch(updateTypeRequestSuccessAction(data)));
    // on(process.env['REACT_APP_SOCKET_TYPE_DELETE'], (data) => dispatch(deleteTypeRequestSuccessAction(data)));
  });

  useUpdate(async function() {
    await dispatch(getGallery());
  });

  useUnmount(function() {
    dispatch(resetStateAction());

    // off(process.env['REACT_APP_SOCKET_TYPE_CREATE']);
    // off(process.env['REACT_APP_SOCKET_TYPE_UPDATE']);
    // off(process.env['REACT_APP_SOCKET_TYPE_DELETE']);
  });

  return <Component />;
}
