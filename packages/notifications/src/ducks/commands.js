'use strict';

import { UUID } from '@packages/utils';

import {
  pushNotificationAction,
  closeNotificationAction,
} from './actions';


export const closeNotification = (index) => dispatch => {
  dispatch(closeNotificationAction(index));
};

export const pushNotification = (notification) => dispatch => {
  notification['index.mjs'] = UUID();
  dispatch(pushNotificationAction(notification));
};

