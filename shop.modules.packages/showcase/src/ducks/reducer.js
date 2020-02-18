
import {
  NEXT_PAGE,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,
} from './types';


const initialState = {
  items: [],
  types: [],
  forms: [],
  brands: [],
  colors: [],
  materials: [],
  categories: [],
  meta: {},
  paging: {
    page: 0
  },
  inProcess: false,
  isInitialize: false,
};


export default (state = initialState, { type, payload }) => {
  switch(type) {
    case NEXT_PAGE: return {
      ...state,
      paging: {
        page: payload,
      }
    };

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
        items: payload['data'],
        meta: payload['meta'],
        types: payload['filter']['types'],
        forms: payload['filter']['forms'],
        brands: payload['filter']['brands'],
        colors: payload['filter']['colors'],
        materials: payload['filter']['materials'],
        categories: payload['filter']['categories'],
        isInitialize: true,
        inProcess: false,
      };
    }

    default: return state;
  }
}