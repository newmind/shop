
import {
  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_REQUEST_FAIL,
  GET_CURRENCIES_REQUEST_SUCCESS,

  // GET_CURRENCY_REQUEST,
  // GET_CURRENCY_REQUEST_FAIL,
  // GET_CURRENCY_REQUEST_SUCCESS,

  ADD_CURRENCY_REQUEST,
  ADD_CURRENCY_REQUEST_FAIL,
  ADD_CURRENCY_REQUEST_SUCCESS,

  UPDATE_CURRENCY_REQUEST,
  UPDATE_CURRENCY_REQUEST_FAIL,
  UPDATE_CURRENCY_REQUEST_SUCCESS,

  DELETE_CURRENCY_REQUEST,
  DELETE_CURRENCY_REQUEST_FAIL,
  DELETE_CURRENCY_REQUEST_SUCCESS,
} from './types';


const initialState = {
  currencies: [],
  inProcess: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'RESET': return {
      ...initialState,
    };

    case GET_CURRENCIES_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case GET_CURRENCIES_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case GET_CURRENCIES_REQUEST_SUCCESS: return {
      ...state,
      currencies: payload,
      inProcess: false,
    };

    case ADD_CURRENCY_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case ADD_CURRENCY_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case ADD_CURRENCY_REQUEST_SUCCESS: return {
      ...state,
      currencies: [
        ...state['currencies'],
        payload,
      ],
      inProcess: false,
    };

    case UPDATE_CURRENCY_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case UPDATE_CURRENCY_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case UPDATE_CURRENCY_REQUEST_SUCCESS: {
      const currencies = state['currencies'].map(currency => {
        if (currency['id'] === payload['id']) {
          return payload;
        }
        return currency;
      });
      return {
        ...state,
        currencies,
        inProcess: false,
      };
    }

    case DELETE_CURRENCY_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case DELETE_CURRENCY_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case DELETE_CURRENCY_REQUEST_SUCCESS: return {
      ...state,
      currencies: state['currencies'].filter(currency => currency['id'] !== payload),
      inProcess: false,
    };

    default: return { ...state };
  }
}