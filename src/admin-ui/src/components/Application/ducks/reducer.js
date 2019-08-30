
import {
  APPLICATION_CHANGE_STATE,

  APPLICATION_GET_PROFILE_REQUEST,
  APPLICATION_GET_PROFILE_REQUEST_FAIL,
  APPLICATION_GET_PROFILE_REQUEST_SUCCESS,
} from './types';

const initialState = {
  isInit: false,
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
    };
    case APPLICATION_GET_PROFILE_REQUEST_SUCCESS: return {
      ...state,
      profile: payload,
    };

    default: return { ...state };
  }
}