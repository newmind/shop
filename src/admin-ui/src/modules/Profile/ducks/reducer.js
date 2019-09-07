
import {
  SIGN_OUT,

  GET_PROFILE_REQUEST,
  GET_PROFILE_REQUEST_FAIL,
  GET_PROFILE_REQUEST_SUCCESS,

  SAVE_PROFILE_REQUEST,
  SAVE_PROFILE_REQUEST_FAIL,
  SAVE_PROFILE_REQUEST_SUCCESS,

  SOCKET_PASSPORT_UPDATED,
} from './types';


const initialState = {
  profile: {},
  inProcess: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_OUT: return {
      ...initialState,
    };

    case GET_PROFILE_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case GET_PROFILE_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case GET_PROFILE_REQUEST_SUCCESS: return {
      ...state,
      profile: payload,
      inProcess: false,
    };

    case SAVE_PROFILE_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case SAVE_PROFILE_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case SAVE_PROFILE_REQUEST_SUCCESS: return {
      ...state,
    };

    case SOCKET_PASSPORT_UPDATED: return {
      ...state,
      profile: payload,
      inProcess: false,
    };

    default: return { ...state };
  }
}