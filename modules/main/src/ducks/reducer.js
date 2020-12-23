
import {
  GET_TYPES_REQUEST,
  GET_TYPES_REQUEST_FAIL,
  GET_TYPES_REQUEST_SUCCESS,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,
} from './types';


const initialState = {
  types: [],
  categories: [],
};


export default (state = initialState, { type, error, payload }) => {
  switch(type) {
    case GET_TYPES_REQUEST: return {
      ...state,
    };
    case GET_TYPES_REQUEST_FAIL: return {
      ...state,
      error,
    };
    case GET_TYPES_REQUEST_SUCCESS: return {
      ...state,
      types: payload,
    };

    case process.env['REACT_APP_SOCKET_TYPE_UPDATED']: return {
      ...state,
      types: state['types'].map((type) => {
        if (type['id'] === payload['id']) {
          return payload;
        }
        return type;
      }),
    };

    case GET_CATEGORIES_REQUEST: return {
      ...state,
    };
    case GET_CATEGORIES_REQUEST_FAIL: return {
      ...state,
      error,
    };
    case GET_CATEGORIES_REQUEST_SUCCESS: return {
      ...state,
      categories: payload,
    };

    case process.env['REACT_APP_SOCKET_CATEGORY_UPDATED']: return {
      ...state,
      categories: state['categories'].map((category) => {
        if (category['id'] === payload['id']) {
          return payload;
        }
        return category;
      }),
    };

    default: return state;
  }
}