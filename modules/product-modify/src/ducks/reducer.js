
import {
  SIGN_OUT,
  RESET,

  GET_TYPES_REQUEST,
  GET_TYPES_REQUEST_FAIL,
  GET_TYPES_REQUEST_SUCCESS,

  GET_UNITS_REQUEST,
  GET_UNITS_REQUEST_FAIL,
  GET_UNITS_REQUEST_SUCCESS,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_FAIL,
  GET_CATEGORIES_REQUEST_SUCCESS,

  GET_COLORS_REQUEST,
  GET_COLORS_REQUEST_FAIL,
  GET_COLORS_REQUEST_SUCCESS,

  GET_MATERIALS_REQUEST,
  GET_MATERIALS_REQUEST_FAIL,
  GET_MATERIALS_REQUEST_SUCCESS,

  GET_FORMS_REQUEST,
  GET_FORMS_REQUEST_FAIL,
  GET_FORMS_REQUEST_SUCCESS,

  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_REQUEST_FAIL,
  GET_CURRENCIES_REQUEST_SUCCESS,

  GET_PRODUCT_REQUEST,
  GET_PRODUCT_REQUEST_FAIL,
  GET_PRODUCT_REQUEST_SUCCESS,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_FAIL,
  UPDATE_PRODUCT_REQUEST_SUCCESS,

  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_FAIL,
  CREATE_PRODUCT_REQUEST_SUCCESS,

  DELETE_IMAGES_REQUEST,
  DELETE_IMAGES_REQUEST_FAIL,
  DELETE_IMAGES_REQUEST_SUCCESS,
} from './types';


const initialState = {
  types: [],
  units: [],
  currencies: [],
  categories: [],
  colors: [],
  materials: [],
  forms: [],
  product: {},
  inProcess: false,
  isError: false,
};

export default (state = { ...initialState }, { type, payload }) => {
  switch (type) {
    case SIGN_OUT:
    case RESET: return {
      ...initialState,
    };

    case GET_TYPES_REQUEST: return {
      ...state,
    };
    case GET_TYPES_REQUEST_FAIL: return {
      ...state,
    };
    case GET_TYPES_REQUEST_SUCCESS: return {
      ...state,
      types: [
        ...state['types'],
        ...payload,
      ],
    };

    case GET_UNITS_REQUEST: return {
      ...state,
    };
    case GET_UNITS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_UNITS_REQUEST_SUCCESS: return {
      ...state,
      units: [
        ...state['units'],
        ...payload,
      ],
    };

    case GET_CATEGORIES_REQUEST: return {
      ...state,
    };
    case GET_CATEGORIES_REQUEST_FAIL: return {
      ...state,
    };
    case GET_CATEGORIES_REQUEST_SUCCESS: return {
      ...state,
      categories: [
        ...state['categories'],
        ...payload,
      ],
    };

    case GET_COLORS_REQUEST: return {
      ...state,
    };
    case GET_COLORS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_COLORS_REQUEST_SUCCESS: return {
      ...state,
      colors: [
        ...state['colors'],
        ...payload,
      ],
    };

    case GET_MATERIALS_REQUEST: return {
      ...state,
    };
    case GET_MATERIALS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_MATERIALS_REQUEST_SUCCESS: return {
      ...state,
      materials: [
        ...state['materials'],
        ...payload,
      ],
    };

    case GET_FORMS_REQUEST: return {
      ...state,
    };
    case GET_FORMS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_FORMS_REQUEST_SUCCESS: return {
      ...state,
      forms: [
        ...state['forms'],
        ...payload,
      ],
    };

    case GET_CURRENCIES_REQUEST: return {
      ...state,
    };
    case GET_CURRENCIES_REQUEST_FAIL: return {
      ...state,
    };
    case GET_CURRENCIES_REQUEST_SUCCESS: return {
      ...state,
      currencies: [
        ...state['currencies'],
        ...payload,
      ],
    };

    case GET_PRODUCT_REQUEST: return {
      ...state,
      isError: false,
    };
    case GET_PRODUCT_REQUEST_FAIL: return {
      ...state,
      isError: true,
    };
    case GET_PRODUCT_REQUEST_SUCCESS: return {
      ...state,
      product: payload,
      isError: false,
    };

    case UPDATE_PRODUCT_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case UPDATE_PRODUCT_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case UPDATE_PRODUCT_REQUEST_SUCCESS: return {
      ...state,
      product: payload,
      inProcess: false,
    };

    case CREATE_PRODUCT_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case CREATE_PRODUCT_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case CREATE_PRODUCT_REQUEST_SUCCESS: return {
      ...state,
      product: payload,
      inProcess: false,
    };

    case DELETE_IMAGES_REQUEST: return {
      ...state,
      inProcess: true,
    };
    case DELETE_IMAGES_REQUEST_FAIL: return {
      ...state,
      inProcess: false,
    };
    case DELETE_IMAGES_REQUEST_SUCCESS: {
      return {
        ...state,
        product: {
          ...state['product'],
          gallery: state['product']['gallery'].filter((item) => (payload.indexOf(item) === -1)),
        },
        inProcess: false,
      };
    }

    default: return state;
  }
}