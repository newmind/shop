
import {
  CREATE_OPERATION_REQUEST,
  CREATE_OPERATION_REQUEST_FAIL,
  CREATE_OPERATION_REQUEST_SUCCESS,
} from './types';


const initialState = {
  data: null,
  error: null,
  inProcess: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

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
      data: payload,
      inProcess: false,
    };

    default: return state;
  }
}