
import {
  PAGE_IN_PROCESS,

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
} from './types';


export const pageInProcessAction = (status = true) => ({ type: PAGE_IN_PROCESS, payload: status });


export const getTypesRequestAction = () => ({ type: GET_TYPES_REQUEST });
export const getTypesRequestFailAction = (error) => ({ type: GET_TYPES_REQUEST_FAIL, error });
export const getTypesRequestSuccessAction = (payload) => ({ type: GET_TYPES_REQUEST_SUCCESS, payload });

export const createTypeRequestAction = () => ({ type: CREATE_TYPE_REQUEST });
export const createTypeRequestFailAction = (error) => ({ type: CREATE_TYPE_REQUEST_FAIL, error });
export const createTypeRequestSuccessAction = (payload) => ({ type: CREATE_TYPE_REQUEST_SUCCESS, payload });

export const updateTypeRequestAction = () => ({ type: UPDATE_TYPE_REQUEST });
export const updateTypeRequestFailAction = (error) => ({ type: UPDATE_TYPE_REQUEST_FAIL, error });
export const updateTypeRequestSuccessAction = (payload) => ({ type: UPDATE_TYPE_REQUEST_SUCCESS, payload });

export const deleteTypesRequestAction = () => ({ type: DELETE_TYPES_REQUEST });
export const deleteTypesRequestFailAction = (error) => ({ type: DELETE_TYPES_REQUEST_FAIL, error });
export const deleteTypesRequestSuccessAction = (payload) => ({ type: DELETE_TYPES_REQUEST_SUCCESS, payload });


export const getCategoriesRequestAction = () => ({ type: GET_CATEGORIES_REQUEST });
export const getCategoriesRequestFailAction = (error) => ({ type: GET_CATEGORIES_REQUEST_FAIL, error });
export const getCategoriesRequestSuccessAction = (payload) => ({ type: GET_CATEGORIES_REQUEST_SUCCESS, payload });

export const createCategoryRequestAction = () => ({ type: CREATE_CATEGORY_REQUEST });
export const createCategoryRequestFailAction = (error) => ({ type: CREATE_CATEGORY_REQUEST_FAIL, error });
export const createCategoryRequestSuccessAction = (payload) => ({ type: CREATE_CATEGORY_REQUEST_SUCCESS, payload });

export const updateCategoryRequestAction = () => ({ type: UPDATE_CATEGORY_REQUEST });
export const updateCategoryRequestFailAction = (error) => ({ type: UPDATE_CATEGORY_REQUEST_FAIL, error });
export const updateCategoryRequestSuccessAction = (payload) => ({ type: UPDATE_CATEGORY_REQUEST_SUCCESS, payload });

export const deleteCategoriesRequestAction = () => ({ type: DELETE_CATEGORIES_REQUEST });
export const deleteCategoriesRequestFailAction = (error) => ({ type: DELETE_CATEGORIES_REQUEST_FAIL, error });
export const deleteCategoriesRequestSuccessAction = (payload) => ({ type: DELETE_CATEGORIES_REQUEST_SUCCESS, payload });


export const getColorsRequestAction = () => ({ type: GET_COLORS_REQUEST });
export const getColorsRequestFailAction = (error) => ({ type: GET_COLORS_REQUEST_FAIL, error });
export const getColorsRequestSuccessAction = (payload) => ({ type: GET_COLORS_REQUEST_SUCCESS, payload });

export const createColorRequestAction = () => ({ type: CREATE_COLOR_REQUEST });
export const createColorRequestFailAction = (error) => ({ type: CREATE_COLOR_REQUEST_FAIL, error });
export const createColorRequestSuccessAction = (payload) => ({ type: CREATE_COLOR_REQUEST_SUCCESS, payload });

export const updateColorRequestAction = () => ({ type: UPDATE_COLOR_REQUEST });
export const updateColorRequestFailAction = (error) => ({ type: UPDATE_COLOR_REQUEST_FAIL, error });
export const updateColorRequestSuccessAction = (payload) => ({ type: UPDATE_COLOR_REQUEST_SUCCESS, payload });

export const deleteColorsRequestAction = () => ({ type: DELETE_COLORS_REQUEST });
export const deleteColorsRequestFailAction = (error) => ({ type: DELETE_COLORS_REQUEST_FAIL, error });
export const deleteColorsRequestSuccessAction = (payload) => ({ type: DELETE_COLORS_REQUEST_SUCCESS, payload });


export const getMaterialsRequestAction = () => ({ type: GET_MATERIALS_REQUEST });
export const getMaterialsRequestFailAction = (error) => ({ type: GET_MATERIALS_REQUEST_FAIL, error });
export const getMaterialsRequestSuccessAction = (payload) => ({ type: GET_MATERIALS_REQUEST_SUCCESS, payload });

export const createMaterialRequestAction = () => ({ type: CREATE_MATERIAL_REQUEST });
export const createMaterialRequestFailAction = (error) => ({ type: CREATE_MATERIAL_REQUEST_FAIL, error });
export const createMaterialRequestSuccessAction = (payload) => ({ type: CREATE_MATERIAL_REQUEST_SUCCESS, payload });

export const updateMaterialRequestAction = () => ({ type: UPDATE_MATERIAL_REQUEST });
export const updateMaterialRequestFailAction = (error) => ({ type: UPDATE_MATERIAL_REQUEST_FAIL, error });
export const updateMaterialRequestSuccessAction = (payload) => ({ type: UPDATE_MATERIAL_REQUEST_SUCCESS, payload });

export const deleteMaterialsRequestAction = () => ({ type: DELETE_MATERIALS_REQUEST });
export const deleteMaterialsRequestFailAction = (error) => ({ type: DELETE_MATERIALS_REQUEST_FAIL, error });
export const deleteMaterialsRequestSuccessAction = (payload) => ({ type: DELETE_MATERIALS_REQUEST_SUCCESS, payload });


export const getFormsRequestAction = () => ({ type: GET_FORMS_REQUEST });
export const getFormsRequestFailAction = (error) => ({ type: GET_FORMS_REQUEST_FAIL, error });
export const getFormsRequestSuccessAction = (payload) => ({ type: GET_FORMS_REQUEST_SUCCESS, payload });

export const createFormRequestAction = () => ({ type: CREATE_FORM_REQUEST });
export const createFormRequestFailAction = (error) => ({ type: CREATE_FORM_REQUEST_FAIL, error });
export const createFormRequestSuccessAction = (payload) => ({ type: CREATE_FORM_REQUEST_SUCCESS, payload });

export const updateFormRequestAction = () => ({ type: UPDATE_FORM_REQUEST });
export const updateFormRequestFailAction = (error) => ({ type: UPDATE_FORM_REQUEST_FAIL, error });
export const updateFormRequestSuccessAction = (payload) => ({ type: UPDATE_FORM_REQUEST_SUCCESS, payload });

export const deleteFormsRequestAction = () => ({ type: DELETE_FORMS_REQUEST });
export const deleteFormsRequestFailAction = (error) => ({ type: DELETE_FORMS_REQUEST_FAIL, error });
export const deleteFormsRequestSuccessAction = (payload) => ({ type: DELETE_FORMS_REQUEST_SUCCESS, payload });


export const getCurrenciesRequestAction = () => ({ type: GET_CURRENCIES_REQUEST });
export const getCurrenciesRequestFailAction = (error) => ({ type: GET_CURRENCIES_REQUEST_FAIL, error });
export const getCurrenciesRequestSuccessAction = (payload) => ({ type: GET_CURRENCIES_REQUEST_SUCCESS, payload });

export const createCurrencyRequestAction = () => ({ type: CREATE_CURRENCY_REQUEST });
export const createCurrencyRequestFailAction = (error) => ({ type: CREATE_CURRENCY_REQUEST_FAIL, error });
export const createCurrencyRequestSuccessAction = (payload) => ({ type: CREATE_CURRENCY_REQUEST_SUCCESS, payload });

export const updateCurrencyRequestAction = () => ({ type: UPDATE_CURRENCY_REQUEST });
export const updateCurrencyRequestFailAction = (error) => ({ type: UPDATE_CURRENCY_REQUEST_FAIL, error });
export const updateCurrencyRequestSuccessAction = (payload) => ({ type: UPDATE_CURRENCY_REQUEST_SUCCESS, payload });

export const deleteCurrenciesRequestAction = () => ({ type: DELETE_CURRENCIES_REQUEST });
export const deleteCurrenciesRequestFailAction = (error) => ({ type: DELETE_CURRENCIES_REQUEST_FAIL, error });
export const deleteCurrenciesRequestSuccessAction = (payload) => ({ type: DELETE_CURRENCIES_REQUEST_SUCCESS, payload });


export const getUnitsRequestAction = () => ({ type: GET_UNITS_REQUEST });
export const getUnitsRequestFailAction = (error) => ({ type: GET_UNITS_REQUEST_FAIL, error });
export const getUnitsRequestSuccessAction = (payload) => ({ type: GET_UNITS_REQUEST_SUCCESS, payload });

export const createUnitRequestAction = () => ({ type: CREATE_UNIT_REQUEST });
export const createUnitRequestFailAction = (error) => ({ type: CREATE_UNIT_REQUEST_FAIL, error });
export const createUnitRequestSuccessAction = (payload) => ({ type: CREATE_UNIT_REQUEST_SUCCESS, payload });

export const updateUnitRequestAction = () => ({ type: UPDATE_UNIT_REQUEST });
export const updateUnitRequestFailAction = (error) => ({ type: UPDATE_UNIT_REQUEST_FAIL, error });
export const updateUnitRequestSuccessAction = (payload) => ({ type: UPDATE_UNIT_REQUEST_SUCCESS, payload });

export const deleteUnitsRequestAction = () => ({ type: DELETE_UNITS_REQUEST });
export const deleteUnitsRequestFailAction = (error) => ({ type: DELETE_UNITS_REQUEST_FAIL, error });
export const deleteUnitsRequestSuccessAction = (payload) => ({ type: DELETE_UNITS_REQUEST_SUCCESS, payload });
