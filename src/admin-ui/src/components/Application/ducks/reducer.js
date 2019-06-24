
import {
  APPLICATION_CHANGE_STATE,

  APPLICATION_AUTH_REQUEST_SUCCESS,
} from './types';

const initialState = {
  isInitializing: true,
  isAuth: false,
};

export const KEY = 'application';


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APPLICATION_CHANGE_STATE: {
      return {
        ...state,
        isInitializing: payload,
      };
    }

    case APPLICATION_AUTH_REQUEST_SUCCESS: return {
      ...state,
      isAuth: true,
    };

    default: return { ...state };
  }
}