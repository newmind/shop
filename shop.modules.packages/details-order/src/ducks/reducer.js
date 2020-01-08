
import {
  GET_OPERATION_BY_ID_REQUEST,
  GET_OPERATION_BY_ID_REQUEST_FAIL,
  GET_OPERATION_BY_ID_REQUEST_SUCCESS,
} from './types';

const initialState = {
  status: 0,
  delivery: null,
  products: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_OPERATION_BY_ID_REQUEST: return {
      ...state,
    };
    case GET_OPERATION_BY_ID_REQUEST_FAIL: return {
      ...state,
    };
    case GET_OPERATION_BY_ID_REQUEST_SUCCESS: return {
      ...state,
      ...payload,
    };
    default: return state;
  }
}