
import {
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST_FAIL,
  GET_PRODUCT_BY_ID_REQUEST_SUCCESS,

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_REQUEST_FAIL,
  CREATE_COMMENT_REQUEST_SUCCESS,

  SOCKET_PRODUCT_UPDATED,
} from './types';

const initialState = {
  product: {
    id: null,
    isSale: false,
    isHit: false,
    amount: 0.00,
    currency: {
      value: '',
    },
    comments: [],
    product: {
      gallery: [],
      brand: 'None',
      name: 'None',
      description: '',
      attributes: [],
    }
  },
  isInitialize: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_BY_ID_REQUEST: return {
      ...state,
    };
    case GET_PRODUCT_BY_ID_REQUEST_FAIL: return {
      ...state,
    };
    case GET_PRODUCT_BY_ID_REQUEST_SUCCESS: {
      return {
        ...state,
        product: {
          ...state['product'],
          ...payload
        },
        isInitialize: true,
      };
    }

    case CREATE_COMMENT_REQUEST: return {
      ...state,
    };
    case CREATE_COMMENT_REQUEST_FAIL: return {
      ...state,
    };
    case CREATE_COMMENT_REQUEST_SUCCESS: return {
      ...state,
      product: {
        ...state['product'],
        comments: [payload, ...state['product']['comments']]
      },
    };

    case SOCKET_PRODUCT_UPDATED: return {
      ...state,
      product: {
        ...state['product'],
        ...payload,
      }
    };

    default: return state;
  }
}