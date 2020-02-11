
import {
  RESET,

  PAGE_IN_PROCESS,

  GET_UNITS_REQUEST,
  GET_UNITS_REQUEST_FAIL,
  GET_UNITS_REQUEST_SUCCESS,

  GET_TYPES_REQUEST,
  GET_TYPES_REQUEST_FAIL,
  GET_TYPES_REQUEST_SUCCESS,

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


export const pageInProcessAction = (payload = true) => ({ type: PAGE_IN_PROCESS, payload });

export const resetAction = () => ({ type: RESET });

export const getUnitsRequestAction = () => ({ type: GET_UNITS_REQUEST });
export const getUnitsRequestFailAction = (error) => ({ type: GET_UNITS_REQUEST_FAIL, error });
export const getUnitsRequestSuccessAction = (payload) => ({ type: GET_UNITS_REQUEST_SUCCESS, payload });

export const getTypesRequestAction = () => ({ type: GET_TYPES_REQUEST });
export const getTypesRequestFailAction = (error) => ({ type: GET_TYPES_REQUEST_FAIL, error });
export const getTypesRequestSuccessAction = (payload) => ({ type: GET_TYPES_REQUEST_SUCCESS, payload });

export const getCategoriesRequestAction = () => ({ type: GET_CATEGORIES_REQUEST });
export const getCategoriesRequestFailAction = (error) => ({ type: GET_CATEGORIES_REQUEST_FAIL, error });
export const getCategoriesRequestSuccessAction = (payload) => ({ type: GET_CATEGORIES_REQUEST_SUCCESS, payload });

export const getColorsRequestAction = () => ({ type: GET_COLORS_REQUEST });
export const getCoorsRequestFailAction = (error) => ({ type: GET_COLORS_REQUEST_FAIL, error });
export const getColorsRequestSuccessAction = (payload) => ({ type: GET_COLORS_REQUEST_SUCCESS, payload });

export const getMaterialsRequestAction = () => ({ type: GET_MATERIALS_REQUEST });
export const getMaterialsRequestFailAction = (error) => ({ type: GET_MATERIALS_REQUEST_FAIL, error });
export const getMaterialsRequestSuccessAction = (payload) => ({ type: GET_MATERIALS_REQUEST_SUCCESS, payload });

export const getFormsRequestAction = () => ({ type: GET_FORMS_REQUEST });
export const getFormsRequestFailAction = (error) => ({ type: GET_FORMS_REQUEST_FAIL, error });
export const getFormsRequestSuccessAction = (payload) => ({ type: GET_FORMS_REQUEST_SUCCESS, payload });

export const getCurrenciesRequestAction = () => ({ type: GET_CURRENCIES_REQUEST });
export const getCurrenciesRequestFailAction = (error) => ({ type: GET_CURRENCIES_REQUEST_FAIL, error });
export const getCurrenciesRequestSuccessAction = (payload) => ({ type: GET_CURRENCIES_REQUEST_SUCCESS, payload });

export const getProductRequestAction = () => ({ type: GET_PRODUCT_REQUEST });
export const getProductRequestFailAction = (error) => ({ type: GET_PRODUCT_REQUEST_FAIL, error });
export const getProductRequestSuccessAction = (payload) => ({ type: GET_PRODUCT_REQUEST_SUCCESS, payload });

export const updateProductRequestAction = () => ({ type: UPDATE_PRODUCT_REQUEST });
export const updateProductRequestFailAction = (error) => ({ type: UPDATE_PRODUCT_REQUEST_FAIL, error });
export const updateProductRequestSuccessAction = (payload) => ({ type: UPDATE_PRODUCT_REQUEST_SUCCESS, payload });

export const createProductRequestAction = () => ({ type: CREATE_PRODUCT_REQUEST });
export const createProductRequestFailAction = (error) => ({ type: CREATE_PRODUCT_REQUEST_FAIL, error });
export const createProductRequestSuccessAction = (payload) => ({ type: CREATE_PRODUCT_REQUEST_SUCCESS, payload });


export const deleteImagesRequestAction = () => ({ type: DELETE_IMAGES_REQUEST });
export const deleteImagesRequestFailAction = (error) => ({ type: DELETE_IMAGES_REQUEST_FAIL, error });
export const deleteImagesRequestSuccessAction = (payload) => ({ type: DELETE_IMAGES_REQUEST_SUCCESS, payload });
