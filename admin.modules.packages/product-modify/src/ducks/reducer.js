
import {
  SIGN_OUT,
  RESET,

  GET_UNITS_REQUEST,
  GET_UNITS_REQUEST_FAIL,
  GET_UNITS_REQUEST_SUCCESS,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,

  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_REQUEST_FAIL,
  GET_CURRENCIES_REQUEST_SUCCESS,

  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REQUEST_FAIL,
  GET_PRODUCT_REQUEST_SUCCESS,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_FAIL,
  UPDATE_PRODUCT_REQUEST_SUCCESS,

  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_FAIL,
  CREATE_PRODUCT_REQUEST_SUCCESS,

  SOCKET_PRODUCT_UPDATED,
} from './types';


const initialState = {
  units: [],
  currencies: [],
  categories: [],
  product: {},
  inProcess: false,
  isError: false,
};

export default (state = { ...initialState }, { type, payload }) => {
  switch (type) {
    case SIGN_OUT:
    case RESET: return {
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
        ...state['units'],
        ...payload['items'],
      ],
    };

    case GET_CATEGORIES_REQUEST: return {
      ...state,
    };
    case GET_CATEGORIES_REQUEST_FAIL: return {
      ...state,
    };
    case GET_CATEGORIES_REQUEST_SUCCESS: return {
      ...state,
      categories: [
        ...state['categories'],
        ...payload['items'],
      ],
    };

    case GET_CURRENCIES_REQUEST: return {
      ...state,
    };
    case GET_CURRENCIES_REQUEST_FAIL: return {
      ...state,
    };
    case GET_CURRENCIES_REQUEST_SUCCESS: return {
      ...state,
      currencies: [
        ...state['currencies'],
        ...payload['items'],
      ],
    };

    case GET_PRODUCT_REQUEST: return {
      ...state,
      isError: false,
    };
    case GET_PRODUCT_REQUEST_FAIL: return {
      ...state,
      isError: true,
    };
    case GET_PRODUCT_REQUEST_SUCCESS: return {
      ...state,
      product: payload,
      isError: false,
    };

    case UPDATE_PRODUCT_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case UPDATE_PRODUCT_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case UPDATE_PRODUCT_REQUEST_SUCCESS: return {
      ...state,
      product: payload,
      inProcess: false,
    };

    case CREATE_PRODUCT_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case CREATE_PRODUCT_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case CREATE_PRODUCT_REQUEST_SUCCESS: return {
      ...state,
      product: payload,
      inProcess: false,
    };

    case SOCKET_PRODUCT_UPDATED: {
      return {
        ...state,
        product: {
          ...state['product'],
          ...payload,
          gallery: payload['gallery'].map(img => img['id'])
        },
      };
    }

    default: return state;
  }
}