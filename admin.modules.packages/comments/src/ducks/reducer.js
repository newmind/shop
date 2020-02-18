
import {
  SIGN_OUT,

  GET_COMMENTS_REQUEST,
  GET_COMMENTS_REQUEST_FAIL,
  GET_COMMENTS_REQUEST_SUCCESS,

  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST_FAIL,
  DELETE_COMMENT_REQUEST_SUCCESS,


} from './types';


const initialState = {
  items: [],
  meta: {},
  error: null,
  inProcess: false,
};


export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case SIGN_OUT: return {
      ...initialState,
    };

    case GET_COMMENTS_REQUEST: return { ...state };
    case GET_COMMENTS_REQUEST_FAIL: return { ...state, error };
    case GET_COMMENTS_REQUEST_SUCCESS: return {
      ...state,
      items: payload['data'],
      meta: payload['meta'],
    };

    case DELETE_COMMENT_REQUEST: return { ...state };
    case DELETE_COMMENT_REQUEST_FAIL: return { ...state, error };
    case DELETE_COMMENT_REQUEST_SUCCESS: return {
      ...state,
      items: [...state['items']].filter((item) => payload.indexOf(item['id']) === -1),
    };

    default: return state;
  }
}