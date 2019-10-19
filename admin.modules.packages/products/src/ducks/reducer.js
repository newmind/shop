
import {
  SIGN_OUT,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_REQUEST_FAIL,
  CREATE_PRODUCTS_REQUEST_SUCCESS,

  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_REQUEST_FAIL,
  REMOVE_PRODUCT_REQUEST_SUCCESS,

  SOCKET_PRODUCT_CREATED,
  SOCKET_PRODUCT_UPDATED,
  SOCKET_PRODUCT_DELETED,
} from './types';

export const KEY = 'Products';

const initialState = {
  products: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_OUT: return {
      ...initialState,
    };

    case GET_PRODUCTS_REQUEST: return {
      ...state,
    };
    case GET_PRODUCTS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_PRODUCTS_REQUEST_SUCCESS: {
      return {
        ...state,
        products: payload,
      };
    }

    case CREATE_PRODUCTS_REQUEST: return {
      ...state,
    };
    case CREATE_PRODUCTS_REQUEST_FAIL: return {
      ...state,
    };
    case SOCKET_PRODUCT_CREATED:
    case CREATE_PRODUCTS_REQUEST_SUCCESS: {
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

    case REMOVE_PRODUCT_REQUEST: return {
      ...state,
    };
    case REMOVE_PRODUCT_REQUEST_FAIL: return {
      ...state,
    };
    case SOCKET_PRODUCT_DELETED:
    case REMOVE_PRODUCT_REQUEST_SUCCESS: {
      const products = [...state['products']].filter((item) => item['id'] !== payload);
      return {
        ...state,
        products,
      };
    }

    case SOCKET_PRODUCT_UPDATED: {
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