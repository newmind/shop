
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
      const index = state['notifications'].findIndex(item => item['index.mjs'] === payload);
      return {
        ...state,
        notifications: [
          ...state['notifications'].slice(0, index),
          ...state['notifications'].slice(index + 1),
        ],
      };
    }

    case PUSH_NOTIFICATION: return {
      ...state,
      notifications: [...state['notifications'], payload],
    };

    default: return { ...state };
  }
}