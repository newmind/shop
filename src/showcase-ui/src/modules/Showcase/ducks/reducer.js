
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  GET_ADDITIONAL_DATA_REQUEST,
  GET_ADDITIONAL_DATA_REQUEST_FAIL,
  GET_ADDITIONAL_DATA_REQUEST_SUCCESS,

  SOCKET_PRODUCT_UPDATED,
  SOCKET_STOCK_PRODUCT_UPDATED,
} from './types';

const initialState = {
  items: [],
  categories: [],
  count: 0,
  paging: {
    page: 1,
    pages: 1,
  },
  inProcess: false,
  isInitialize: false,
};


export default (state = initialState, { type, payload }) => {
  switch(type) {
    case GET_PRODUCTS_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case GET_PRODUCTS_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case GET_PRODUCTS_REQUEST_SUCCESS: {
      return {
        ...state,
        items: [
          ...payload['items']
        ],//.concat(payload['items']),
        count: payload['count'],
        paging: {
          page: Number(payload['paging']['page']),
          pages: payload['paging']['pages'],
        },
        isInitialize: true,
        inProcess: false,
      };
    }

    case GET_ADDITIONAL_DATA_REQUEST: return {
      ...state,
    };
    case GET_ADDITIONAL_DATA_REQUEST_FAIL: return {
      ...state,
    };
    case GET_ADDITIONAL_DATA_REQUEST_SUCCESS: return {
      ...state,
      ...payload,
    };

    case SOCKET_STOCK_PRODUCT_UPDATED: return {
      ...state,
      items: state['items'].map(product => {
        if (product['id'] === payload['id']) {
          return payload;
        }
        return product;
      }),
    };

    case SOCKET_PRODUCT_UPDATED: {
      return {
        ...state,
        items: state['items'].map(product => {
          if (product['product']['id'] === payload['id']) {
            return {
              ...product,
              product: {
                ...product['product'],
                ...payload,
              }
            };
          }
          return product;
        }),
      };
    }

    default: return state;
  }
}