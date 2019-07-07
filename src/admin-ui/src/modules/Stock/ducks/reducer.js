
import {
  DESTROY,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,

  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_REQUEST_FAIL,
  GET_CURRENCIES_REQUEST_SUCCESS,

  GET_STOCK_PRODUCTS_REQUEST,
  GET_STOCK_PRODUCTS_REQUEST_FAIL,
  GET_STOCK_PRODUCTS_REQUEST_SUCCESS,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  CREATE_STOCK_PRODUCTS_REQUEST,
  CREATE_STOCK_PRODUCTS_REQUEST_FAIL,
  CREATE_STOCK_PRODUCTS_REQUEST_SUCCESS,

  UPDATE_STOCK_PRODUCTS_REQUEST,
  UPDATE_STOCK_PRODUCTS_REQUEST_FAIL,
  UPDATE_STOCK_PRODUCTS_REQUEST_SUCCESS,

  DELETE_STOCK_PRODUCTS_REQUEST,
  DELETE_STOCK_PRODUCTS_REQUEST_FAIL,
  DELETE_STOCK_PRODUCTS_REQUEST_SUCCESS,

  SOCKET_STOCK_PRODUCT_CREATED,
  SOCKET_STOCK_PRODUCT_DELETED,
  SOCKET_STOCK_PRODUCT_UPDATED,
} from './types';


export const KEY = 'Stock';

const initialState = {
  categories: [],
  currencies: [],
  stock: [],
  products: [],
  inProcess: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DESTROY: return {
      ...initialState,
    };

    case GET_CATEGORIES_REQUEST: return {
      ...state,
    };
    case GET_CATEGORIES_REQUEST_FAIL: return {
      ...state,
    };
    case GET_CATEGORIES_REQUEST_SUCCESS: return {
      ...state,
      categories: payload,
    };

    case GET_CURRENCIES_REQUEST: return {
      ...state,
    };
    case GET_CURRENCIES_REQUEST_FAIL: return {
      ...state,
    };
    case GET_CURRENCIES_REQUEST_SUCCESS: return {
      ...state,
      currencies: payload,
    };

    case GET_PRODUCTS_REQUEST: return {
      ...state,
    };
    case GET_PRODUCTS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_PRODUCTS_REQUEST_SUCCESS: return {
      ...state,
      products: payload,
    };

    case GET_STOCK_PRODUCTS_REQUEST: return {
      ...state,
    };
    case GET_STOCK_PRODUCTS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_STOCK_PRODUCTS_REQUEST_SUCCESS: return {
      ...state,
      stock: payload.sort((left, right) => {
        if (left['id'] > right['id']) {
          return 1;
        } else if (left['id'] < right['id']) {
          return -1;
        }
        return 0;
      }),
    };

    case CREATE_STOCK_PRODUCTS_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case CREATE_STOCK_PRODUCTS_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case SOCKET_STOCK_PRODUCT_CREATED:
    case CREATE_STOCK_PRODUCTS_REQUEST_SUCCESS: {
      const stock = state['stock'];
      if ( ! stock.some(item => item['id'] === payload['id'])) {
        stock.unshift(payload);
      }
      return {
        ...state,
        stock: [
          ...state['stock']
        ],
        inProcess: false,
      };
    }

    case UPDATE_STOCK_PRODUCTS_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case UPDATE_STOCK_PRODUCTS_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case SOCKET_STOCK_PRODUCT_UPDATED:
    case UPDATE_STOCK_PRODUCTS_REQUEST_SUCCESS: return {
      ...state,
      stock: state['stock'].map(item => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      }),
      inProcess: false,
    };

    case DELETE_STOCK_PRODUCTS_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case DELETE_STOCK_PRODUCTS_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case SOCKET_STOCK_PRODUCT_DELETED:
    case DELETE_STOCK_PRODUCTS_REQUEST_SUCCESS: {
      const stock = state['stock'];
      const newStock = stock.filter(item => item['id'] !== payload);
      return {
        ...state,
        stock: newStock,
        inProcess: false,
      };
    }

    default: return state;
  }
}