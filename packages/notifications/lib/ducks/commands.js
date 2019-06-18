'use strict';

import { UUID } from '@packages/utils';
import { pushNotificationAction, closeNotificationAction } from './actions';
export var closeNotification = function closeNotification(index) {
  return function (dispatch) {
    dispatch(closeNotificationAction(index));
  };
};
export var pushNotification = function pushNotification(notification) {
  return function (dispatch) {
    notification['index.mjs'] = UUID();
    dispatch(pushNotificationAction(notification));
  };
};