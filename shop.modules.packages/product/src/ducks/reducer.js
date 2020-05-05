
import {
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST_FAIL,
  GET_PRODUCT_BY_ID_REQUEST_SUCCESS,

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_REQUEST_FAIL,
  CREATE_COMMENT_REQUEST_SUCCESS,

  SOCKET_PRODUCT_UPDATED,

  SOCKET_COMMENT_CREATED,
  SOCKET_COMMENT_UPDATED,
  SOCKET_COMMENT_DELETED,
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
    gallery: [],
    brand: 'None',
    name: 'None',
    description: '',
    attributes: [],
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
    case SOCKET_COMMENT_CREATED:
    case CREATE_COMMENT_REQUEST_SUCCESS: {
      if (state['product']['uuid'] !== payload['productId']) {
        return { ...state };
      }
      if (state['product']['comments'].some((comment) => comment['id'] === payload['id'])) {
        return { ...state };
      }
      return {
        ...state,
        product: {
          ...state['product'],
          comments: [ payload, ...state['product']['comments'] ]
        },
      };
    }

    case SOCKET_PRODUCT_UPDATED: return {
      ...state,
      product: {
        ...state['product'],
        ...payload,
      }
    };

    case SOCKET_COMMENT_UPDATED: {
      if (state['product']['uuid'] !== payload['productId']) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        product: {
          ...state['product'],
          comments: state['product']['comments'].map((comment) => {
            if (comment['id'] === payload['id']) {
              return {
                ...comment,
                id: payload['id'],
                person: payload['person'],
                comment: payload['comment'],
                createdAt: payload['createdAt'],
                evaluation: payload['evaluation'],
              };
            }
            return comment;
          }),
        },
      };
    }

    case SOCKET_COMMENT_DELETED: {
      return {
        ...state,
        product: {
          ...state['product'],
          comments: state['product']['comments'].filter((comment) => payload.some((id) => comment['id'] !== id)),
        },
      };
    }

    default: return state;
  }
}