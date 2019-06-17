
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  GET_ADDITIONAL_DATA_REQUEST,
  GET_ADDITIONAL_DATA_REQUEST_FAIL,
  GET_ADDITIONAL_DATA_REQUEST_SUCCESS,

  SOCKET_PRODUCT_UPDATED,
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

    case SOCKET_PRODUCT_UPDATED: {
      const products = state['items'];
      const newProducts = products.map(item => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        items: newProducts,
      };
    }

    default: return state;
  }
}