'use strict';

import { UUID } from '@ui.packages/utils';

import {
  pushNotificationAction,
  closeNotificationAction,
} from './actions';


export const closeNotification = (index) => dispatch => {
  dispatch(closeNotificationAction(index));
};

export const pushNotification = (notification) => dispatch => {
  notification['index'] = UUID();
  dispatch(pushNotificationAction(notification));
};

