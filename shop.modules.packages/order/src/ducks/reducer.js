
import {
  CREATE_OPERATION_REQUEST,
  CREATE_OPERATION_REQUEST_FAIL,
  CREATE_OPERATION_REQUEST_SUCCESS,
} from './types';


const initialState = {
  error: null,
  inProcess: false,
};

export default (state = initialState, { type }) => {
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
      inProcess: false,
    };

    default: return state;
  }
}