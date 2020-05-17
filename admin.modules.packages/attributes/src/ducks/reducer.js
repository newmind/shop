
import {
  SIGN_OUT,

  GET_TYPES_REQUEST, GET_TYPES_REQUEST_FAIL, GET_TYPES_REQUEST_SUCCESS,
  CREATE_TYPE_REQUEST, CREATE_TYPE_REQUEST_FAIL, CREATE_TYPE_REQUEST_SUCCESS,
  UPDATE_TYPE_REQUEST, UPDATE_TYPE_REQUEST_FAIL, UPDATE_TYPE_REQUEST_SUCCESS,
  DELETE_TYPES_REQUEST, DELETE_TYPES_REQUEST_FAIL, DELETE_TYPES_REQUEST_SUCCESS,

  GET_CATEGORIES_REQUEST, GET_CATEGORIES_REQUEST_FAIL, GET_CATEGORIES_REQUEST_SUCCESS,
  CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_REQUEST_FAIL, CREATE_CATEGORY_REQUEST_SUCCESS,
  UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_REQUEST_FAIL, UPDATE_CATEGORY_REQUEST_SUCCESS,
  DELETE_CATEGORIES_REQUEST, DELETE_CATEGORIES_REQUEST_FAIL, DELETE_CATEGORIES_REQUEST_SUCCESS,

  GET_COLORS_REQUEST, GET_COLORS_REQUEST_FAIL, GET_COLORS_REQUEST_SUCCESS,
  CREATE_COLOR_REQUEST, CREATE_COLOR_REQUEST_FAIL, CREATE_COLOR_REQUEST_SUCCESS,
  UPDATE_COLOR_REQUEST, UPDATE_COLOR_REQUEST_FAIL, UPDATE_COLOR_REQUEST_SUCCESS,
  DELETE_COLORS_REQUEST, DELETE_COLORS_REQUEST_FAIL, DELETE_COLORS_REQUEST_SUCCESS,

  GET_MATERIALS_REQUEST, GET_MATERIALS_REQUEST_FAIL, GET_MATERIALS_REQUEST_SUCCESS,
  CREATE_MATERIAL_REQUEST, CREATE_MATERIAL_REQUEST_FAIL, CREATE_MATERIAL_REQUEST_SUCCESS,
  UPDATE_MATERIAL_REQUEST, UPDATE_MATERIAL_REQUEST_FAIL, UPDATE_MATERIAL_REQUEST_SUCCESS,
  DELETE_MATERIALS_REQUEST, DELETE_MATERIALS_REQUEST_FAIL, DELETE_MATERIALS_REQUEST_SUCCESS,

  GET_FORMS_REQUEST, GET_FORMS_REQUEST_FAIL, GET_FORMS_REQUEST_SUCCESS,
  CREATE_FORM_REQUEST, CREATE_FORM_REQUEST_FAIL, CREATE_FORM_REQUEST_SUCCESS,
  UPDATE_FORM_REQUEST, UPDATE_FORM_REQUEST_FAIL, UPDATE_FORM_REQUEST_SUCCESS,
  DELETE_FORMS_REQUEST, DELETE_FORMS_REQUEST_FAIL, DELETE_FORMS_REQUEST_SUCCESS,

  GET_CURRENCIES_REQUEST, GET_CURRENCIES_REQUEST_FAIL, GET_CURRENCIES_REQUEST_SUCCESS,
  CREATE_CURRENCY_REQUEST, CREATE_CURRENCY_REQUEST_FAIL, CREATE_CURRENCY_REQUEST_SUCCESS,
  UPDATE_CURRENCY_REQUEST, UPDATE_CURRENCY_REQUEST_FAIL, UPDATE_CURRENCY_REQUEST_SUCCESS,
  DELETE_CURRENCIES_REQUEST, DELETE_CURRENCIES_REQUEST_FAIL, DELETE_CURRENCIES_REQUEST_SUCCESS,

  GET_UNITS_REQUEST, GET_UNITS_REQUEST_FAIL, GET_UNITS_REQUEST_SUCCESS,
  CREATE_UNIT_REQUEST, CREATE_UNIT_REQUEST_FAIL, CREATE_UNIT_REQUEST_SUCCESS,
  UPDATE_UNIT_REQUEST, UPDATE_UNIT_REQUEST_FAIL, UPDATE_UNIT_REQUEST_SUCCESS,
  DELETE_UNITS_REQUEST, DELETE_UNITS_REQUEST_FAIL, DELETE_UNITS_REQUEST_SUCCESS,

  SOCKET_TYPE_CREATED, SOCKET_TYPE_DELETED, SOCKET_TYPE_UPDATED,
  SOCKET_CATEGORY_CREATED, SOCKET_CATEGORY_DELETED, SOCKET_CATEGORY_UPDATED,
  SOCKET_COLOR_CREATED, SOCKET_COLOR_DELETED, SOCKET_COLOR_UPDATED,
  SOCKET_MATERIAL_CREATED, SOCKET_MATERIAL_DELETED, SOCKET_MATERIAL_UPDATED,
  SOCKET_FORM_CREATED, SOCKET_FORM_DELETED, SOCKET_FORM_UPDATED,
  SOCKET_CURRENCY_CREATED, SOCKET_CURRENCY_DELETED, SOCKET_CURRENCY_UPDATED,
  SOCKET_UNIT_CREATED, SOCKET_UNIT_DELETED, SOCKET_UNIT_UPDATED,
} from './types';


const initialState = {
  types: [],
  units: [],
  forms: [],
  colors: [],
  materials: [],
  categories: [],
  currencies: [],
};


export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case SIGN_OUT: return {
      ...initialState,
    };

    case GET_TYPES_REQUEST: return { ...state };
    case GET_TYPES_REQUEST_FAIL: return { ...state, error };
    case GET_TYPES_REQUEST_SUCCESS: return { ...state, types: payload };

    case CREATE_TYPE_REQUEST: return { ...state };
    case CREATE_TYPE_REQUEST_FAIL: return { ...state, error };
    case SOCKET_TYPE_CREATED:
    case CREATE_TYPE_REQUEST_SUCCESS: {
      if (state['types'].some((item) => item['id'] === payload['id'])) {
        return { ...state, };
      }
      return {
        ...state,
        types: [ payload, ...state['types'] ],
      };
    }

    case UPDATE_TYPE_REQUEST: return { ...state };
    case UPDATE_TYPE_REQUEST_FAIL: return { ...state, error };
    case SOCKET_TYPE_UPDATED:
    case UPDATE_TYPE_REQUEST_SUCCESS: return {
      ...state,
      types: [...state['types']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      }),
    };

    case DELETE_TYPES_REQUEST: return { ...state };
    case DELETE_TYPES_REQUEST_FAIL: return { ...state, error };
    case SOCKET_TYPE_DELETED:
    case DELETE_TYPES_REQUEST_SUCCESS: return {
      ...state,
      types: [...state['types']].filter((item) => !~ payload.indexOf(item['id'])),
    };


    case GET_CATEGORIES_REQUEST: return { ...state };
    case GET_CATEGORIES_REQUEST_FAIL: return { ...state, error };
    case GET_CATEGORIES_REQUEST_SUCCESS: return { ...state, categories: payload };

    case CREATE_CATEGORY_REQUEST: return { ...state };
    case CREATE_CATEGORY_REQUEST_FAIL: return { ...state, error };
    case SOCKET_CATEGORY_CREATED:
    case CREATE_CATEGORY_REQUEST_SUCCESS: {
      if (state['categories'].some((item) => item['id'] === payload['id'])) {
        return { ...state, };
      }
      return {
        ...state,
        categories: [ payload, ...state['categories'] ],
      };
    }

    case UPDATE_CATEGORY_REQUEST: return { ...state };
    case UPDATE_CATEGORY_REQUEST_FAIL: return { ...state, error };
    case SOCKET_CATEGORY_UPDATED:
    case UPDATE_CATEGORY_REQUEST_SUCCESS: return {
      ...state,
      categories: [ ...state['categories'] ].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      }),
    };

    case DELETE_CATEGORIES_REQUEST: return { ...state };
    case DELETE_CATEGORIES_REQUEST_FAIL: return { ...state, error };
    case SOCKET_CATEGORY_DELETED:
    case DELETE_CATEGORIES_REQUEST_SUCCESS: return {
      ...state,
      categories: [...state['categories']].filter((item) => (payload.indexOf(item['id']) === -1)),
    };


    case GET_COLORS_REQUEST: return { ...state };
    case GET_COLORS_REQUEST_FAIL: return { ...state, error };
    case GET_COLORS_REQUEST_SUCCESS: return { ...state, colors: payload };

    case CREATE_COLOR_REQUEST: return { ...state };
    case CREATE_COLOR_REQUEST_FAIL: return { ...state, error };
    case SOCKET_COLOR_CREATED:
    case CREATE_COLOR_REQUEST_SUCCESS: {
      if (state['colors'].some((item) => item['id'] === payload['id'])) {
        return { ...state, };
      }
      return {
        ...state,
        colors: [ payload, ...state['colors'] ],
      };
    }

    case UPDATE_COLOR_REQUEST: return { ...state };
    case UPDATE_COLOR_REQUEST_FAIL: return { ...state, error };
    case SOCKET_COLOR_UPDATED:
    case UPDATE_COLOR_REQUEST_SUCCESS: return {
      ...state,
      colors: [...state['colors']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      }),
    };

    case DELETE_COLORS_REQUEST: return { ...state };
    case DELETE_COLORS_REQUEST_FAIL: return { ...state, error };
    case SOCKET_COLOR_DELETED:
    case DELETE_COLORS_REQUEST_SUCCESS: return {
      ...state,
      colors: [...state['colors']].filter((item) => (payload.indexOf(item['id']) === -1)),
    };


    case GET_MATERIALS_REQUEST: return { ...state };
    case GET_MATERIALS_REQUEST_FAIL: return { ...state, error };
    case GET_MATERIALS_REQUEST_SUCCESS: return { ...state, materials: payload };

    case CREATE_MATERIAL_REQUEST: return { ...state };
    case CREATE_MATERIAL_REQUEST_FAIL: return { ...state, error };
    case SOCKET_MATERIAL_CREATED:
    case CREATE_MATERIAL_REQUEST_SUCCESS: {
      if (state['materials'].some((item) => item['id'] === payload['id'])) {
        return { ...state, };
      }
      return {
        ...state,
        materials: [ payload, ...state['materials'] ],
      };
    }

    case UPDATE_MATERIAL_REQUEST: return { ...state };
    case UPDATE_MATERIAL_REQUEST_FAIL: return { ...state, error };
    case SOCKET_MATERIAL_UPDATED:
    case UPDATE_MATERIAL_REQUEST_SUCCESS: return {
      ...state,
      materials: [...state['materials']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      }),
    };

    case DELETE_MATERIALS_REQUEST: return { ...state };
    case DELETE_MATERIALS_REQUEST_FAIL: return { ...state, error };
    case SOCKET_MATERIAL_DELETED:
    case DELETE_MATERIALS_REQUEST_SUCCESS: return {
      ...state,
      materials: [...state['materials']].filter((item) => (payload.indexOf(item['id']) === -1)),
    };


    case GET_FORMS_REQUEST: return { ...state };
    case GET_FORMS_REQUEST_FAIL: return { ...state, error };
    case GET_FORMS_REQUEST_SUCCESS: return { ...state, forms: payload };

    case CREATE_FORM_REQUEST: return { ...state };
    case CREATE_FORM_REQUEST_FAIL: return { ...state, error };
    case SOCKET_FORM_CREATED:
    case CREATE_FORM_REQUEST_SUCCESS: {
      if (state['forms'].some((item) => item['id'] === payload['id'])) {
        return { ...state, };
      }
      return {
        ...state,
        forms: [ payload, ...state['forms'] ],
      };
    }

    case UPDATE_FORM_REQUEST: return { ...state };
    case UPDATE_FORM_REQUEST_FAIL: return { ...state, error };
    case SOCKET_FORM_UPDATED:
    case UPDATE_FORM_REQUEST_SUCCESS: return {
      ...state,
      forms: [...state['forms']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      }),
    };

    case DELETE_FORMS_REQUEST: return { ...state };
    case DELETE_FORMS_REQUEST_FAIL: return { ...state, error };
    case SOCKET_FORM_DELETED:
    case DELETE_FORMS_REQUEST_SUCCESS: return {
      ...state,
      forms: [...state['forms']].filter((item) => (payload.indexOf(item['id']) === -1)),
    };


    case GET_CURRENCIES_REQUEST: return { ...state };
    case GET_CURRENCIES_REQUEST_FAIL: return { ...state, error };
    case GET_CURRENCIES_REQUEST_SUCCESS: return { ...state, currencies: payload };

    case CREATE_CURRENCY_REQUEST: return { ...state };
    case CREATE_CURRENCY_REQUEST_FAIL: return { ...state, error };
    case SOCKET_CURRENCY_CREATED:
    case CREATE_CURRENCY_REQUEST_SUCCESS: {
      if (state['currencies'].some((item) => item['id'] === payload['id'])) {
        return { ...state, };
      }
      return {
        ...state,
        currencies: [ payload, ...state['currencies'] ],
      };
    }

    case UPDATE_CURRENCY_REQUEST: return { ...state };
    case UPDATE_CURRENCY_REQUEST_FAIL: return { ...state, error };
    case SOCKET_CURRENCY_UPDATED:
    case UPDATE_CURRENCY_REQUEST_SUCCESS: return {
      ...state,
      currencies: [...state['currencies']].map((item) => {
        if (item['uuid'] === payload['uuid']) {
          return payload;
        }
        return item;
      }),
    };

    case DELETE_CURRENCIES_REQUEST: return { ...state };
    case DELETE_CURRENCIES_REQUEST_FAIL: return { ...state, error };
    case SOCKET_CURRENCY_DELETED:
    case DELETE_CURRENCIES_REQUEST_SUCCESS: return {
      ...state,
      currencies: [...state['currencies']].filter((item) => (payload.indexOf(item['uuid']) === -1)),
    };


    case GET_UNITS_REQUEST: return { ...state };
    case GET_UNITS_REQUEST_FAIL: return { ...state, error };
    case GET_UNITS_REQUEST_SUCCESS: return { ...state, units: payload };

    case CREATE_UNIT_REQUEST: return { ...state };
    case CREATE_UNIT_REQUEST_FAIL: return { ...state, error };
    case SOCKET_UNIT_CREATED:
    case CREATE_UNIT_REQUEST_SUCCESS: {
      if (state['units'].some((item) => item['id'] === payload['id'])) {
        return { ...state, };
      }
      return {
        ...state,
        units: [ payload, ...state['units'] ],
      };
    }

    case UPDATE_UNIT_REQUEST: return { ...state };
    case UPDATE_UNIT_REQUEST_FAIL: return { ...state, error };
    case SOCKET_UNIT_UPDATED:
    case UPDATE_UNIT_REQUEST_SUCCESS: return {
      ...state,
      units: [...state['units']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      }),
    };

    case DELETE_UNITS_REQUEST: return { ...state };
    case DELETE_UNITS_REQUEST_FAIL: return { ...state, error };
    case SOCKET_UNIT_DELETED:
    case DELETE_UNITS_REQUEST_SUCCESS: return {
      ...state,
      units: [...state['units']].filter((item) => (payload.indexOf(item['id']) === -1)),
    };

    default: return state;
  }
}