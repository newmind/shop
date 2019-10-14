
import {
  CREATE_OPERATION_REQUEST,
  CREATE_OPERATION_REQUEST_FAIL,
  CREATE_OPERATION_REQUEST_SUCCESS,

  GET_LENSES_REQUEST,
  GET_LENSES_REQUEST_FAIL,
  GET_LENSES_REQUEST_SUCCESS,
} from './types';


const initialState = {
  lenses: [],
  error: null,
  inProcess: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LENSES_REQUEST: return {
      ...state,
    };
    case GET_LENSES_REQUEST_FAIL: return {
      ...state,
      error: payload
    };
    case GET_LENSES_REQUEST_SUCCESS: return {
      ...state,
      lenses: payload,
    };

    case CREATE_OPERATION_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case CREATE_OPERATION_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case CREATE_OPERATION_REQUEST_SUCCESS: return {
      ...state,
      inProcess: false,
    };

    default: return state;
  }
}