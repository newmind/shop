
import {
  GET_SUB_PRODUCTS_REQUEST,
  GET_SUB_PRODUCTS_REQUEST_FAIL,
  GET_SUB_PRODUCTS_REQUEST_SUCCESS,

  CREATE_SUB_PRODUCTS_REQUEST,
  CREATE_SUB_PRODUCTS_REQUEST_FAIL,
  CREATE_SUB_PRODUCTS_REQUEST_SUCCESS,

  REMOVE_SUB_PRODUCT_REQUEST,
  REMOVE_SUB_PRODUCT_REQUEST_FAIL,
  REMOVE_SUB_PRODUCT_REQUEST_SUCCESS,

  SOCKET_SUB_PRODUCT_CREATED,
  SOCKET_SUB_PRODUCT_UPDATED,
  SOCKET_SUB_PRODUCT_DELETED,
} from './types';

export const KEY = 'Products';

const initialState = {
  products: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'RESET': return {
      ...initialState,
    };

    case GET_SUB_PRODUCTS_REQUEST: return {
      ...state,
    };
    case GET_SUB_PRODUCTS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_SUB_PRODUCTS_REQUEST_SUCCESS: {
      return {
        ...state,
        products: payload,
      };
    }

    case CREATE_SUB_PRODUCTS_REQUEST: return {
      ...state,
    };
    case CREATE_SUB_PRODUCTS_REQUEST_FAIL: return {
      ...state,
    };
    case SOCKET_SUB_PRODUCT_CREATED:
    case CREATE_SUB_PRODUCTS_REQUEST_SUCCESS: {
      const products = state['products'];
      if ( ! products.some(item => item['id'] === payload['id'])) {
        products.unshift(payload);
      }
      return {
        ...state,
        products: [
          ...products,
        ],
      };
    }

    case REMOVE_SUB_PRODUCT_REQUEST: return {
      ...state,
    };
    case REMOVE_SUB_PRODUCT_REQUEST_FAIL: return {
      ...state,
    };
    case SOCKET_SUB_PRODUCT_DELETED:
    case REMOVE_SUB_PRODUCT_REQUEST_SUCCESS: {
      const products = state['products'];
      const index = products.findIndex(item => item['id'] === payload);
      return {
        ...state,
        products: [
          ...products.slice(0, index),
          ...products.slice(index + 1),
        ],
      };
    }

    case SOCKET_SUB_PRODUCT_UPDATED: {
      const products = state['products']
        .map(item => {
          if (item['id'] === payload['id']) {
            return payload;
          }
          return item;
        });
      return {
        ...state,
        products: [
          ...products,
        ],
      };
    }

    default: return { ...state };
  }
}