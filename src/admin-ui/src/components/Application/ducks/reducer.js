
import {
  APPLICATION_CHANGE_STATE,

  APPLICATION_GET_PROFILE_REQUEST,
  APPLICATION_GET_PROFILE_REQUEST_FAIL,
  APPLICATION_GET_PROFILE_REQUEST_SUCCESS,

  APPLICATION_AUTH_REQUEST_SUCCESS,

  SOCKET_PASSPORT_UPDATED,
} from './types';

const initialState = {
  isInit: false,
  isAuth: false,
  profile: {},
};

export const KEY = 'application';


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APPLICATION_CHANGE_STATE: {
      return {
        ...state,
        isInit: payload,
      };
    }

    case APPLICATION_GET_PROFILE_REQUEST: return {
      ...state,
    };
    case APPLICATION_GET_PROFILE_REQUEST_FAIL: return {
      ...state,
      isAuth: false,
    };
    case APPLICATION_GET_PROFILE_REQUEST_SUCCESS: return {
      ...state,
      profile: payload,
      isAuth: true,
    };

    case APPLICATION_AUTH_REQUEST_SUCCESS:
    case SOCKET_PASSPORT_UPDATED: return {
      ...state,
      profile: payload,
    };

    default: return { ...state };
  }
}