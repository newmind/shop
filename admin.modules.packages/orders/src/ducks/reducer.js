
import {
  SIGN_OUT,

  GET_OPERATIONS_REQUEST,
  GET_OPERATIONS_REQUEST_FAIL,
  GET_OPERATIONS_REQUEST_SUCCESS,

  GET_STATUSES_REQUEST,
  GET_STATUSES_REQUEST_FAIL,
  GET_STATUSES_REQUEST_SUCCESS,

  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_REQUEST_FAIL,
  UPDATE_STATUS_REQUEST_SUCCESS,
} from './types';


const initialState = {
  statuses: [],
  items: [],
  meta: {},
  error: null,
  ordersInProcess: [],
};


export default (state = initialState, { type, payload, error }) => {
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
      items: payload['data'],
      meta: payload['meta'],
      inProcess: false,
    };

    case GET_STATUSES_REQUEST: return {
      ...state,
    };
    case GET_STATUSES_REQUEST_FAIL: return {
      ...state,
      error,
    };
    case GET_STATUSES_REQUEST_SUCCESS: return {
      ...state,
      statuses: payload,
    };

    case UPDATE_STATUS_REQUEST: return {
      ...state,
      ordersInProcess: [ payload, ...state['ordersInProcess'] ],
    };
    case UPDATE_STATUS_REQUEST_FAIL: return {
      ...state,
      error,
      ordersInProcess: state['ordersInProcess'].filter((item) => (item === payload)),
    };
    case UPDATE_STATUS_REQUEST_SUCCESS: return {
      ...state,
      items: state['items'].map((item) => {
        if (item['externalId'] === payload['externalId']) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      }),
      ordersInProcess: state['ordersInProcess'].filter((item) => (item === payload['id'])),
    };

    default: return state;
  }
}