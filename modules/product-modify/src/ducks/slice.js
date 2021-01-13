
import { createSlice } from '@reduxjs/toolkit';


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
};

const REDUCER_NAME = 'product-modify';


const productModifySlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetState(state) {
      state['types'] = [];
      state['units'] = [];
      state['currencies'] = [];
      state['categories'] = [];
      state['colors'] = [];
      state['materials'] = [];
      state['forms'] = [];
      state['product'] = {};
      state['inProcess'] = false;
    },

    getTypesRequestAction() {},
    getTypesRequestFailAction() {},
    getTypesRequestSuccessAction(state, { payload }) {
      state['types'] = payload;
    },

    getUnitsRequestAction() {},
    getUnitsRequestFailAction() {},
    getUnitsRequestSuccessAction(state, { payload }) {
      state['units'] = payload;
    },

    getCategoriesRequestAction() {},
    getCategoriesRequestFailAction() {},
    getCategoriesRequestSuccessAction(state, { payload }) {
      state['categories'] = payload;
    },

    getColorsRequestAction() {},
    getColorsRequestFailAction() {},
    getColorsRequestSuccessAction(state, { payload }) {
      state['colors'] = payload;
    },

    getMaterialsRequestAction() {},
    getMaterialsRequestFailAction() {},
    getMaterialsRequestSuccessAction(state, { payload }) {
      state['materials'] = payload;
    },

    getFormsRequestAction() {},
    getFormsRequestFailAction() {},
    getFormsRequestSuccessAction(state, { payload }) {
      state['forms'] = payload;
    },

    getCurrenciesRequestAction() {},
    getCurrenciesRequestFailAction() {},
    getCurrenciesRequestSuccessAction(state, { payload }) {
      state['currencies'] = payload;
    },

    getProductRequestAction() {},
    getProductRequestFailAction() {},
    getProductRequestSuccessAction(state, { payload }) {
      state['product'] = payload;
    },

    updateProductRequestAction(state) {
      state['inProcess'] = true;
    },
    updateProductRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateProductRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['product'] = payload;
    },

    createProductRequestAction(state) {
      state['inProcess'] = true;
    },
    createProductRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createProductRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['product'] = payload;
    },

    deleteImageRequestAction(state) {
      state['inProcess'] = true;
    },
    deleteImageRequestFailAction(state) {
      state['inProcess'] = false;
    },
    deleteImageRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['product'] = {
        ...state['product'],
        gallery: state['product']['gallery'].filter((item) => (payload.indexOf(item) === -1)),
      };
    },
  },
});

export const {
  resetState,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  getColorsRequestAction,
  getColorsRequestFailAction,
  getColorsRequestSuccessAction,

  getCurrenciesRequestAction,
  getCurrenciesRequestFailAction,
  getCurrenciesRequestSuccessAction,

  getFormsRequestAction,
  getFormsRequestFailAction,
  getFormsRequestSuccessAction,

  getMaterialsRequestAction,
  getMaterialsRequestFailAction,
  getMaterialsRequestSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  getTypesRequestAction,
  getTypesRequestFailAction,
  getTypesRequestSuccessAction,

  createProductRequestAction,
  createProductRequestFailAction,
  createProductRequestSuccessAction,

  updateProductRequestAction,
  updateProductRequestFailAction,
  updateProductRequestSuccessAction,

  deleteImageRequestAction,
  deleteImageRequestFailAction,
  deleteImageRequestSuccessAction,
} = productModifySlice['actions'];

export const selectTypes = (state) => state[REDUCER_NAME]['types'];
export const selectUnits = (state) => state[REDUCER_NAME]['units'];
export const selectForms = (state) => state[REDUCER_NAME]['forms'];
export const selectColors = (state) => state[REDUCER_NAME]['colors'];
export const selectProduct = (state) => state[REDUCER_NAME]['product'];
export const selectMaterials = (state) => state[REDUCER_NAME]['materials'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectCategories = (state) => state[REDUCER_NAME]['categories'];
export const selectCurrencies = (state) => state[REDUCER_NAME]['currencies'];

export const name = productModifySlice['name'];
export const reducer = productModifySlice['reducer'];
