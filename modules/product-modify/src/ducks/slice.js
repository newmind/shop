
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  brands: [],
  types: [],
  categories: [],
  attributes: [],
  units: [],
  currencies: [],
  product: {},
  inProcess: false,
};

const REDUCER_NAME = 'product-modify';


const productModifySlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['types'] = [];
      state['brands'] = [];
      state['units'] = [];
      state['currencies'] = [];
      state['categories'] = [];
      state['attributes'] = [];
      state['product'] = {};
      state['inProcess'] = false;
    },

    setProcessAction(state, { payload }) {
      state['inProcess'] = payload;
    },

    getBrandsRequestAction() {},
    getBrandsRequestFailAction() {},
    getBrandsRequestSuccessAction(state, { payload }) {
      state['brands'] = payload;
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

    getAttributesRequestAction() {},
    getAttributesRequestFailAction() {},
    getAttributesRequestSuccessAction(state, { payload }) {
      state['attributes'] = payload;
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
    createProductRequestSuccessAction(state) {
      state['inProcess'] = false;
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
        gallery: state['product']['gallery'].filter((item) => (payload['uuid'].indexOf(item) === -1)),
      };
    },
  },
});

export const {
  resetStateAction,

  setProcessAction,

  getBrandsRequestAction,
  getBrandsRequestFailAction,
  getBrandsRequestSuccessAction,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  getCurrenciesRequestAction,
  getCurrenciesRequestFailAction,
  getCurrenciesRequestSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  getTypesRequestAction,
  getTypesRequestFailAction,
  getTypesRequestSuccessAction,

  getAttributesRequestAction,
  getAttributesRequestFailAction,
  getAttributesRequestSuccessAction,

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
export const selectBrands = (state) => state[REDUCER_NAME]['brands'];
export const selectProduct = (state) => state[REDUCER_NAME]['product'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectCategories = (state) => state[REDUCER_NAME]['categories'];
export const selectCurrencies = (state) => state[REDUCER_NAME]['currencies'];
export const selectAttributes = (state) => state[REDUCER_NAME]['attributes'];

export const name = productModifySlice['name'];
export const reducer = productModifySlice['reducer'];
