import { CLOSE_NOTIFICATION, PUSH_NOTIFICATION } from './types';
export var closeNotificationAction = function closeNotificationAction(index) {
  return {
    type: CLOSE_NOTIFICATION,
    payload: index
  };
};
export var pushNotificationAction = function pushNotificationAction(notification) {
  return {
    type: PUSH_NOTIFICATION,
    payload: notification
  };
};