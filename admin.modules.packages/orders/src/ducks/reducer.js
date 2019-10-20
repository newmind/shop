
import {
  SIGN_OUT,

  GET_OPERATIONS_REQUEST,
  GET_OPERATIONS_REQUEST_FAIL,
  GET_OPERATIONS_REQUEST_SUCCESS,
} from './types';

const initialState = {
  items: [],
  meta: {},
  inProcess: false,
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_OUT: return {
      ...initialState,
    };

    case GET_OPERATIONS_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case GET_OPERATIONS_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case GET_OPERATIONS_REQUEST_SUCCESS: return {
      ...state,
      ...payload,
      inProcess: false,
    };

    default: return state;
  }
}