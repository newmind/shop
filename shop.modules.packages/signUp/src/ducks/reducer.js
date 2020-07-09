
import {
  SIGN_UP_REQUEST,
  SIGN_UP_REQUEST_FAIL,
  SIGN_UP_REQUEST_SUCCESS,
} from './types';


const initialState = {
  error: null,
  inProcess: false,
};


export default (state = initialState, { type, error }) => {
  switch (type) {
    case SIGN_UP_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case SIGN_UP_REQUEST_FAIL: return {
      ...state,
      error,
      inProcess: false,
    };
    case SIGN_UP_REQUEST_SUCCESS: return {
      ...state,
      inProcess: false,
    };

    default: return state;
  }
}
