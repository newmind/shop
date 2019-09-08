
import {
  SIGN_OUT,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,

  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_REQUEST_FAIL,
  // CREATE_CATEGORY_REQUEST_SUCCESS,

  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST_FAIL,
  // UPDATE_CATEGORY_REQUEST_SUCCESS,

  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST_FAIL,
  // DELETE_CATEGORY_REQUEST_SUCCESS,

  SOCKET_CATEGORY_CREATED,
  SOCKET_CATEGORY_DELETED,
  SOCKET_CATEGORY_UPDATED,
} from './types';


const initialState = {
  categories: [],
  inProcess: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_OUT: return {
      ...initialState,
    };

    case GET_CATEGORIES_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case GET_CATEGORIES_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case GET_CATEGORIES_REQUEST_SUCCESS: return {
      ...state,
      categories: payload,
      inProcess: false,
    };

    case CREATE_CATEGORY_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case CREATE_CATEGORY_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case SOCKET_CATEGORY_CREATED: {
      return {
        ...state,
        categories: [...state['categories'], payload],
        inProcess: false,
      };
    }

    case UPDATE_CATEGORY_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case UPDATE_CATEGORY_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case SOCKET_CATEGORY_UPDATED: return {
      ...state,
      categories: state['categories'].map(category => {
        if (category['id'] === payload['id']) {
          return payload;
        }
        return category;
      }),
      inProcess: false,
    };

    case DELETE_CATEGORY_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case DELETE_CATEGORY_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case SOCKET_CATEGORY_DELETED: {
      return {
        ...state,
        categories: state['categories'].filter((item) => item['id'] !== payload),
        inProcess: false,
      };
    }

    default: return { ...state };
  }
}