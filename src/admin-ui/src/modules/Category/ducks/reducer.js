
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,

  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_REQUEST_FAIL,
  CREATE_CATEGORY_REQUEST_SUCCESS,

  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST_FAIL,
  UPDATE_CATEGORY_REQUEST_SUCCESS,

  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST_FAIL,
  DELETE_CATEGORY_REQUEST_SUCCESS,
} from './types';


const initialState = {
  categories: [],
  inProcess: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'RESET': return {
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
    case CREATE_CATEGORY_REQUEST_SUCCESS: return {
      ...state,
      categories: [
        ...state['categories'],
        payload,
      ],
      inProcess: false,
    };

    case UPDATE_CATEGORY_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case UPDATE_CATEGORY_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case UPDATE_CATEGORY_REQUEST_SUCCESS: return {
      ...state,
      categories: payload,
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
    case DELETE_CATEGORY_REQUEST_SUCCESS: {
      const categories = state['categories'];
      const index = categories.findIndex(category => category['id'] === payload);
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, index),
          ...state.categories.slice(index + 1)
        ],
        inProcess: false,
      };
    }

    default: return { ...state };
  }
}