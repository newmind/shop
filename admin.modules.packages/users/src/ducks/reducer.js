
import {
  GET_USERS_REQUEST,
  GET_USERS_REQUEST_FAIL,
  GET_USERS_REQUEST_SUCCESS,
} from './types';


const initialState = {
  items: [],
  error: null,
};

export default (state = initialState, { type, payload, error }) => {
  switch(type) {
    case GET_USERS_REQUEST: return {
      ...state,
    };
    case GET_USERS_REQUEST_FAIL: return {
      ...state,
      error,
    };
    case GET_USERS_REQUEST_SUCCESS: return {
      ...state,
      items: payload,
    };

    default: return state;
  }
}
