
import {
  GET_UNITS_REQUEST,
  GET_UNITS_REQUEST_FAIL,
  GET_UNITS_REQUEST_SUCCESS,

  CREATE_UNIT_REQUEST,
  CREATE_UNIT_REQUEST_FAIL,
  CREATE_UNIT_REQUEST_SUCCESS,
} from './types';


const initialState = {
  units: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'RESET': return {
      ...initialState,
    };

    case GET_UNITS_REQUEST: return {
      ...state,
    };
    case GET_UNITS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_UNITS_REQUEST_SUCCESS: return {
      ...state,
      units: [
        ...payload,
      ],
    };

    case CREATE_UNIT_REQUEST: return {
      ...state,
    };
    case CREATE_UNIT_REQUEST_FAIL: return {
      ...state,
    };
    case CREATE_UNIT_REQUEST_SUCCESS: return {
      ...state,
      units: [
        ...state['units'],
        payload,
      ],
    };

    default: return { ...state };
  }
}