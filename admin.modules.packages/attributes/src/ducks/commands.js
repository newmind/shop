
import request from '@ui.packages/request';
import { closeDialog } from '@ui.packages/dialog';
import { pushNotification } from '@ui.packages/notifications';

import {
  pageInProcessAction,

  getTypesRequestAction, getTypesRequestFailAction, getTypesRequestSuccessAction,
  createTypeRequestAction, createTypeRequestFailAction, createTypeRequestSuccessAction,
  updateTypeRequestAction, updateTypeRequestFailAction, updateTypeRequestSuccessAction,
  deleteTypesRequestAction, deleteTypesRequestFailAction, deleteTypesRequestSuccessAction,

  getCategoriesRequestAction, getCategoriesRequestFailAction, getCategoriesRequestSuccessAction,
  createCategoryRequestAction, createCategoryRequestFailAction, createCategoryRequestSuccessAction,
  updateCategoryRequestAction, updateCategoryRequestFailAction, updateCategoryRequestSuccessAction,
  deleteCategoriesRequestAction, deleteCategoriesRequestFailAction, deleteCategoriesRequestSuccessAction,

  getColorsRequestAction, getColorsRequestSuccessAction, getColorsRequestFailAction,
  createColorRequestAction, createColorRequestSuccessAction, createColorRequestFailAction,
  updateColorRequestAction, updateColorRequestSuccessAction, updateColorRequestFailAction,
  deleteColorsRequestAction, deleteColorsRequestFailAction, deleteColorsRequestSuccessAction,

  getMaterialsRequestAction, getMaterialsRequestFailAction, getMaterialsRequestSuccessAction,
  createMaterialRequestAction, createMaterialRequestFailAction, createMaterialRequestSuccessAction,
  updateMaterialRequestAction, updateMaterialRequestFailAction, updateMaterialRequestSuccessAction,
  deleteMaterialsRequestAction, deleteMaterialsRequestFailAction, deleteMaterialsRequestSuccessAction,

  getFormsRequestAction, getFormsRequestFailAction, getFormsRequestSuccessAction,
  createFormRequestAction, createFormRequestFailAction, createFormRequestSuccessAction,
  updateFormRequestAction, updateFormRequestFailAction, updateFormRequestSuccessAction,
  deleteFormsRequestAction, deleteFormsRequestFailAction, deleteFormsRequestSuccessAction,

  getCurrenciesRequestAction, getCurrenciesRequestFailAction, getCurrenciesRequestSuccessAction,
  createCurrencyRequestAction, createCurrencyRequestFailAction, createCurrencyRequestSuccessAction,
  updateCurrencyRequestAction, updateCurrencyRequestFailAction, updateCurrencyRequestSuccessAction,
  deleteCurrenciesRequestAction, deleteCurrenciesRequestFailAction, deleteCurrenciesRequestSuccessAction,

  getUnitsRequestAction, getUnitsRequestFailAction, getUnitsRequestSuccessAction,
  createUnitRequestAction, createUnitRequestFailAction, createUnitRequestSuccessAction,
  updateUnitRequestAction, updateUnitRequestFailAction, updateUnitRequestSuccessAction,
  deleteUnitsRequestAction, deleteUnitsRequestFailAction, deleteUnitsRequestSuccessAction,
} from './actions';


export const pageInProcess = (state = true) => async (dispatch) => dispatch(pageInProcessAction(state));


export const getTypes = () => async (dispatch) => {
  try {
    dispatch(getTypesRequestAction());

    const { data } = await request({
      url: '/types',
      method: 'get',
    });

    dispatch(getTypesRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getTypesRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Тип"'
    }));
    dispatch(pageInProcessAction(false));
  }
};

export const createType = (data) => async (dispatch) => {
  try {
    dispatch(createTypeRequestAction());

    const result = await request({
      url: '/types',
      method: 'post',
      data,
    });

    dispatch(createTypeRequestSuccessAction(result['data']));
    dispatch(closeDialog('type'));
  }
  catch(error) {
    dispatch(createTypeRequestFailAction(error));
  }
};

export const updateType = (data) => async (dispatch) => {
  try {
    dispatch(updateTypeRequestAction());

    const result = await request({
      url: '/types/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateTypeRequestSuccessAction(result['data']));
    dispatch(closeDialog('type'));
  }
  catch(error) {
    dispatch(updateTypeRequestFailAction(error));
  }
};

export const deleteTypes = (id) => async (dispatch) => {
  try {
    dispatch(deleteTypesRequestAction());

    const result = await request({
      url: '/types',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteTypesRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteTypesRequestFailAction(error));
  }
};


export const getCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoriesRequestAction());

    const { data } = await request({
      url: '/categories',
      method: 'get',
    });

    dispatch(getCategoriesRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getCategoriesRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Катигория"'
    }));
    dispatch(pageInProcessAction(false));
  }
};

export const createCategory = (data) => async (dispatch) => {
  try {
    dispatch(createCategoryRequestAction());

    const result = await request({
      url: '/categories',
      method: 'post',
      data,
    });

    dispatch(createCategoryRequestSuccessAction(result['data']));
    dispatch(closeDialog('category'));
  }
  catch(error) {
    dispatch(createCategoryRequestFailAction(error));
  }
};

export const updateCategory = (data) => async (dispatch) => {
  try {
    dispatch(updateCategoryRequestAction());

    const result = await request({
      url: '/categories/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateCategoryRequestSuccessAction(result['data']));
    dispatch(closeDialog('category'));
  }
  catch(error) {
    dispatch(updateCategoryRequestFailAction(error));
  }
};

export const deleteCategories = (id) => async (dispatch) => {
  try {
    dispatch(deleteCategoriesRequestAction());

    const result = await request({
      url: '/categories',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteCategoriesRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteCategoriesRequestFailAction(error));
  }
};


export const getColors = () => async (dispatch) => {
  try {
    dispatch(getColorsRequestAction());

    const { data } = await request({
      url: '/colors',
      method: 'get',
    });

    dispatch(getColorsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getColorsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Цвет"'
    }));
    dispatch(pageInProcessAction(false));
  }
};

export const createColor = (data) => async (dispatch) => {
  try {
    dispatch(createColorRequestAction());

    const result = await request({
      url: '/colors',
      method: 'post',
      data,
    });

    dispatch(createColorRequestSuccessAction(result['data']));
    dispatch(closeDialog('color'));
  }
  catch(error) {
    dispatch(createColorRequestFailAction(error));
  }
};

export const updateColor = (data) => async (dispatch) => {
  try {
    dispatch(updateColorRequestAction());

    const result = await request({
      url: '/colors/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateColorRequestSuccessAction(result['data']));
    dispatch(closeDialog('color'));
  }
  catch(error) {
    dispatch(updateColorRequestFailAction(error));
  }
};

export const deleteColors = (id) => async (dispatch) => {
  try {
    dispatch(deleteColorsRequestAction());

    const result = await request({
      url: '/colors',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteColorsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(deleteColorsRequestFailAction(error));
  }
};


export const getMaterials = () => async (dispatch) => {
  try {
    dispatch(getMaterialsRequestAction());

    const { data } = await request({
      url: '/materials',
      method: 'get',
    });

    dispatch(getMaterialsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getMaterialsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Материал"'
    }));
    dispatch(pageInProcessAction(false));
  }
};

export const createMaterial = (data) => async (dispatch) => {
  try {
    dispatch(createMaterialRequestAction());

    const result = await request({
      url: '/materials',
      method: 'post',
      data,
    });

    dispatch(createMaterialRequestSuccessAction(result['data']));
    dispatch(closeDialog('material'));
  }
  catch(error) {
    dispatch(createMaterialRequestFailAction(error));
  }
};

export const updateMaterial = (data) => async (dispatch) => {
  try {
    dispatch(updateMaterialRequestAction());

    const result = await request({
      url: '/materials/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateMaterialRequestSuccessAction(result['data']));
    dispatch(closeDialog('material'));
  }
  catch(error) {
    dispatch(updateMaterialRequestFailAction(error));
  }
};

export const deleteMaterials = (id) => async (dispatch) => {
  try {
    dispatch(deleteMaterialsRequestAction());

    const { data } = await request({
      url: '/materials',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteMaterialsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(deleteMaterialsRequestFailAction(error));
  }
};


export const getForms = () => async (dispatch) => {
  try {
    dispatch(getFormsRequestAction());

    const { data } = await request({
      url: '/forms',
      method: 'get',
    });

    dispatch(getFormsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getFormsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Форма"'
    }));
    dispatch(pageInProcessAction(false));
  }
};

export const createForm = (data) => async (dispatch) => {
  try {
    dispatch(createFormRequestAction());

    const result = await request({
      url: '/forms',
      method: 'post',
      data,
    });

    dispatch(createFormRequestSuccessAction(result['data']));
    dispatch(closeDialog('form'));
  }
  catch(error) {
    dispatch(createFormRequestFailAction(error));
  }
};

export const updateForm = (data) => async (dispatch) => {
  try {
    dispatch(updateFormRequestAction());

    const result = await request({
      url: '/forms/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateFormRequestSuccessAction(result['data']));
    dispatch(closeDialog('form'));
  }
  catch(error) {
    dispatch(updateFormRequestFailAction(error));
  }
};

export const deleteForms = (id) => async (dispatch) => {
  try {
    dispatch(deleteFormsRequestAction());

    const { data } = await request({
      url: '/forms',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteFormsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(deleteFormsRequestFailAction(error));
  }
};


export const getCurrencies = () => async (dispatch) => {
  try {
    dispatch(getCurrenciesRequestAction());

    const { data } = await request({
      url: '/currencies',
      method: 'get',
    });

    dispatch(getCurrenciesRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(getCurrenciesRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Валюта"'
    }));
    dispatch(pageInProcessAction(false));
  }
};

export const createCurrency = (data) => async (dispatch) => {
  try {
    dispatch(createCurrencyRequestAction());

    const result = await request({
      url: '/currencies',
      method: 'post',
      data,
    });

    dispatch(createCurrencyRequestSuccessAction(result['data']));
    dispatch(closeDialog('form'));
  }
  catch(error) {
    dispatch(createCurrencyRequestFailAction(error));
  }
};

export const updateCurrency = (data) => async (dispatch) => {
  try {
    dispatch(updateCurrencyRequestAction());

    const result = await request({
      url: '/currencies/' + data['uuid'],
      method: 'put',
      data,
    });

    dispatch(updateCurrencyRequestSuccessAction(result['data']));
    dispatch(closeDialog('form'));
  }
  catch(error) {
    dispatch(updateCurrencyRequestFailAction(error));
  }
};

export const deleteCurrencies = (uuid) => async (dispatch) => {
  try {
    dispatch(deleteCurrenciesRequestAction());

    const { data } = await request({
      url: '/currencies',
      method: 'delete',
      data: { uuid }
    });

    dispatch(deleteCurrenciesRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(deleteCurrenciesRequestFailAction(error));
  }
};


export const getUnits = () => async (dispatch) => {
  try {
    dispatch(getUnitsRequestAction());

    const result = await request({
      url: '/units',
      method: 'get',
    });

    dispatch(getUnitsRequestSuccessAction(result['data']));
  }
  catch(error) {
    dispatch(getUnitsRequestFailAction(error));
    dispatch(pushNotification({
      mode: 'danger',
      content: 'Ошибка получения списка "Единицы измерения"'
    }));
    dispatch(pageInProcessAction(false));
  }
};

export const createUnit = (data) => async (dispatch) => {
  try {
    dispatch(createUnitRequestAction());

    const result = await request({
      url: '/units',
      method: 'post',
      data,
    });

    dispatch(createUnitRequestSuccessAction(result['data']));
    dispatch(closeDialog('unit'));
  }
  catch(error) {
    dispatch(createUnitRequestFailAction(error));
  }
};

export const updateUnit = (data) => async (dispatch) => {
  try {
    dispatch(updateUnitRequestAction());

    const result = await request({
      url: '/units/' + data['id'],
      method: 'put',
      data,
    });

    dispatch(updateUnitRequestSuccessAction(result['data']));
    dispatch(closeDialog('unit'));
  }
  catch(error) {
    dispatch(updateUnitRequestFailAction(error));
  }
};

export const deleteUnits = (id) => async (dispatch) => {
  try {
    dispatch(deleteUnitsRequestAction());

    const { data } = await request({
      url: '/units',
      method: 'delete',
      data: { id }
    });

    dispatch(deleteUnitsRequestSuccessAction(data));
  }
  catch(error) {
    dispatch(deleteUnitsRequestFailAction(error));
  }
};