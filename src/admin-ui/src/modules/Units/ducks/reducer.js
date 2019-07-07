
import {
  GET_UNITS_REQUEST,
  GET_UNITS_REQUEST_FAIL,
  GET_UNITS_REQUEST_SUCCESS,

  CREATE_UNIT_REQUEST,
  CREATE_UNIT_REQUEST_FAIL,
  CREATE_UNIT_REQUEST_SUCCESS,

  REMOVE_UNIT_REQUEST,
  REMOVE_UNIT_REQUEST_FAIL,
  REMOVE_UNIT_REQUEST_SUCCESS,

  UPDATE_UNIT_REQUEST,
  UPDATE_UNIT_REQUEST_FAIL,
  UPDATE_UNIT_REQUEST_SUCCESS,

  SOCKET_UNIT_CREATED,
  SOCKET_UNIT_DELETED,
  SOCKET_UNIT_UPDATED,
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
    case SOCKET_UNIT_CREATED:
    case CREATE_UNIT_REQUEST_SUCCESS: {
      const units = [...state['units']];
      if ( ! units.some(unit => unit['id'] === payload['id'])) {
        units.push(payload);
      }
      return {
        ...state,
        units,
      };
    }

    case UPDATE_UNIT_REQUEST: return {
      ...state,
    };
    case UPDATE_UNIT_REQUEST_FAIL: return {
      ...state,
    };
    case SOCKET_UNIT_UPDATED:
    case UPDATE_UNIT_REQUEST_SUCCESS: return {
      ...state,
      units: state['units'].map(unit => {
        if (unit['id'] === payload['id']) {
          return payload;
        }
        return unit;
      })
    };

    case REMOVE_UNIT_REQUEST: return {
      ...state,
    };
    case REMOVE_UNIT_REQUEST_FAIL: return {
      ...state,
    };
    case SOCKET_UNIT_DELETED:
    case REMOVE_UNIT_REQUEST_SUCCESS: {
      return {
        ...state,
        units: state['units'].filter(unit => unit['id'] !== payload)
      };
    }

    default: return { ...state };
  }
}