
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_REQUEST_FAIL,
  REMOVE_PRODUCT_REQUEST_SUCCESS,

  SOCKET_PRODUCT_DELETED,
  SOCKET_PRODUCT_UPDATED,
} from './types';


const initialState = {
  products: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'RESET': return {
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

    case REMOVE_PRODUCT_REQUEST: return {
      ...state,
    };
    case REMOVE_PRODUCT_REQUEST_FAIL: return {
      ...state,
    };
    case REMOVE_PRODUCT_REQUEST_SUCCESS: {
      const products = state['products'];
      const index = products.findIndex(product => product['id'] === payload);
      return {
        ...state,
        products: [
          ...state.products.slice(0, index),
          ...state.products.slice(index + 1)
        ],
      };
    }

    case SOCKET_PRODUCT_UPDATED: {
      let products = state['products']
        .map(item => {
          if (item['id'] === payload['id']) {
            return payload;
          }
          return item;
        });
      if (payload['status'] === 0 && ! products.some(item => item['id'] === payload['id'])) {
        products.unshift(payload);
      } else if (payload['status'] === 1 && products.some(item => item['id'] === payload['id'])) {
        const index = products.findIndex(item => item['id'] === payload['id']);
        products = [
          ...products.slice(0, index),
          ...products.slice(index + 1),
        ];
      }

      return {
        ...state,
        products: [
          ...products,
        ],
      };
    }
    case SOCKET_PRODUCT_DELETED: {
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

    default: return { ...state };
  }
}