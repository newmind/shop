
import { on, off } from "@ui.packages/socket";
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';

import Component from './Component';

import { getPromotions } from '../ducks/commands';
import {
  resetStateAction,

  createPromotionRequestSuccessAction,
  updatePromotionRequestSuccessAction,
  deletePromotionRequestSuccessAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Скидки`;

    await dispatch(getPromotions());

    on(process.env['REACT_APP_SOCKET_PROMOTION_CREATE'], (data) => dispatch(createPromotionRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_PROMOTION_UPDATE'], (data) => dispatch(updatePromotionRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_PROMOTION_DELETE'], (data) => dispatch(deletePromotionRequestSuccessAction(data)));
  });

  useUpdate(async function() {

  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_PROMOTION_CREATE']);
    off(process.env['REACT_APP_SOCKET_PROMOTION_UPDATE']);
    off(process.env['REACT_APP_SOCKET_PROMOTION_DELETE']);
  });

  return <Component />;
}
