
import {
  NEXT_PAGE,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  SOCKET_PRODUCT_UPDATED,
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

    case process.env['REACT_APP_SOCKET_TYPE_UPDATED']: return {
      ...state,
      types: state['types'].map((type) => {
        if (type['id'] === payload['id']) {
          return {
            ...type,
            value: payload['value'],
          };
        }
        return type;
      }),
    };

    case process.env['REACT_APP_SOCKET_CATEGORY_UPDATED']: return {
      ...state,
      categories: state['categories'].map((category) => {
        if (category['id'] === payload['id']) {
          return {
            ...category,
            value: payload['value'],
          };
        }
        return category;
      }),
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

    case SOCKET_PRODUCT_UPDATED: return {
      ...state,
      items: state['items'].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      })
    };

    default: return state;
  }
}