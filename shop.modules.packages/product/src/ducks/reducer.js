
import {
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST_FAIL,
  GET_PRODUCT_BY_ID_REQUEST_SUCCESS,

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_REQUEST_FAIL,
  CREATE_COMMENT_REQUEST_SUCCESS,

  SOCKET_PRODUCT_UPDATED,

  STOCK_PRODUCT_UPDATED,

  SOCKET_UNIT_DELETED,
  SOCKET_UNIT_UPDATED,
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
        product: {
          ...state['product']['product'],
          ...payload
        },
      }
    };

    case STOCK_PRODUCT_UPDATED: return {
      ...state,
      product: {
        ...state['product'],
        ...payload,
      }
    };

    case SOCKET_UNIT_DELETED: {
      const stock = state['product'];
      const product = stock['product'];
      return {
        ...state,
        product: {
          ...stock,
          product: {
            ...product,
            attributes: product['attributes'] ? product['attributes'].map(attr => {
              if (attr['unit']) {
                if (attr['unit']['id'] === payload) {
                  attr['unit'] = null;
                }
              }
              return attr;
            }) : [],
          }
        }
      };
    }

    case SOCKET_UNIT_UPDATED: {
      const stock = state['product'];
      const product = stock['product'];
      return {
        ...state,
        product: {
          ...stock,
          product: {
            ...product,
            attributes: product['attributes'] ? product['attributes'].map(attr => {
              if (attr['unit']) {
                if (attr['unit']['id'] === payload['id']) {
                  attr['unit'] = payload;
                }
              }
              return attr;
            }) : [],
          }
        }
      };
    }

    default: return state;
  }
}