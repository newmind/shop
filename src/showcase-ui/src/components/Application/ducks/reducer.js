
import {
  APPLICATION_CHANGE_STATE,

  APPLICATION_AUTH_REQUEST,
  APPLICATION_AUTH_REQUEST_FAIL,
  APPLICATION_AUTH_REQUEST_SUCCESS,

  APPLICATION_GET_PROFILE_REQUEST,
  APPLICATION_GET_PROFILE_REQUEST_FAIL,
  APPLICATION_GET_PROFILE_REQUEST_SUCCESS,

  APPLICATION_SIG_OUT_REQUEST,
  APPLICATION_SIG_OUT_REQUEST_FAIL,
  APPLICATION_SIG_OUT_REQUEST_SUCCESS,

  SOCKET_PASSPORT_UPDATED,
} from './types';

const initialState = {
  isInit: false,
  isAuth: false,
  inProcess: false,
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

    case APPLICATION_SIG_OUT_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case APPLICATION_SIG_OUT_REQUEST_FAIL: return {
      ...state,
      isAuth: true,
      inProcess: false,
    };
    case APPLICATION_SIG_OUT_REQUEST_SUCCESS: return {
      ...state,
      isAuth: false,
      inProcess: false,
      profile: {},
    };

    case APPLICATION_AUTH_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case APPLICATION_AUTH_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case APPLICATION_AUTH_REQUEST_SUCCESS:
    case SOCKET_PASSPORT_UPDATED: return {
      ...state,
      inProcess: false,
      profile: payload,
    };

    default: return { ...state };
  }
}