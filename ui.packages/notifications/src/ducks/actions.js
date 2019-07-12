
import {
  CLOSE_NOTIFICATION,
  PUSH_NOTIFICATION,
} from './types';


export const closeNotificationAction = (index) => ({
  type: CLOSE_NOTIFICATION,
  payload: index,
});

export const pushNotificationAction = (notification) => ({
  type: PUSH_NOTIFICATION,
  payload: notification,
});
