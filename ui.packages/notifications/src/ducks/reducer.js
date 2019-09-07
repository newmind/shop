
import {
  PUSH_NOTIFICATION,
  CLOSE_NOTIFICATION,
} from './types';

const initialState = {
  notifications: [],
};


export const KEY = 'notifications';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLOSE_NOTIFICATION: {
      return {
        ...state,
        notifications: state['notifications'].filter(item => item['index'] !== payload),
      };
    }

    case PUSH_NOTIFICATION: return {
      ...state,
      notifications: [...state['notifications'], payload],
    };

    default: return { ...state };
  }
}