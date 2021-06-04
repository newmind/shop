
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  brands: [],
  types: [],
  categories: [],
  attributes: [],
  units: [],
  currencies: [],
  gallery: [],
  promotions: [],
  product: {},
  inProcess: false,
  inCreateProcess: false,
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
      state['inFormProcess'] = false;
    },

    setProcessAction(state, { payload }) {
      state['inProcess'] = payload;
    },

    getBrandsRequestAction() {},
    getBrandsRequestFailAction() {},
    getBrandsRequestSuccessAction(state, { payload }) {
      state['brands'] = payload;
    },

    createBrandRequestAction(state) {
      state['inCreateProcess'] = true;
    },
    createBrandRequestFailAction(state) {
      state['inCreateProcess'] = false;
    },
    createBrandRequestSuccessAction(state, { payload }) {
      state['inCreateProcess'] = false;
      state['brands'] = [
        payload,
        ...state['brands'],
      ];
    },

    getTypesRequestAction() {},
    getTypesRequestFailAction() {},
    getTypesRequestSuccessAction(state, { payload }) {
      state['types'] = payload;
    },

    createTypesRequestAction(state) {
      state['inCreateProcess'] = true;
    },
    createTypesRequestFailAction(state) {
      state['inCreateProcess'] = false;
    },
    createTypesRequestSuccessAction(state, { payload }) {
      state['inCreateProcess'] = false;
      state['types'] = [
          payload,
          ...state['types'],
      ];
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

    createCategoryRequestAction(state) {
      state['inCreateProcess'] = true;
    },
    createCategoryRequestFailAction(state) {
      state['inCreateProcess'] = false;
    },
    createCategoryRequestSuccessAction(state, { payload }) {
      state['inCreateProcess'] = false;
      state['categories'] = [
        payload,
        ...state['categories'],
      ];
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
      state['product'] = {
        ...payload,
        type: payload['type'] ? payload['type']['id'] : null,
        category: payload['category'] ? payload['category']['id'] : null,
        brand: payload['brand'] ? payload['brand']['id'] : null,
        currencyCode: payload['currency'] ? payload['currency']['code'] : null,
      };
    },

    updateProductRequestAction(state) {
      state['inProcess'] = true;
    },
    updateProductRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateProductRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['product'] = {
        ...payload,
        type: payload['type'] ? payload['type']['id'] : null,
        category: payload['category'] ? payload['category']['id'] : null,
        brand: payload['brand'] ? payload['brand']['id'] : null,
        currencyCode: payload['currency'] ? payload['currency']['code'] : null,
      };
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

    getGalleryRequestAction(state) {},
    getGalleryRequestFailAction(state) {},
    getGalleryRequestSuccessAction(state, { payload }) {
      state['gallery'] = payload;
    },

    createGalleryRequestAction(state) {
      state['inCreateProcess'] = true;
    },
    createGalleryRequestFailAction(state) {
      state['inCreateProcess'] = false;
    },
    createGalleryRequestSuccessAction(state, { payload }) {
      if ( ! state['gallery'].some((item) => item['uuid'] === payload['uuid'])) {
        state['gallery'] = [...payload, ...state['gallery']];
      }
      state['inCreateProcess'] = false;
    },

    getPromotionsRequestAction(state) {
      state['inProcess'] = true;
    },
    getPromotionsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getPromotionsRequestSuccessAction(state, { payload }) {
      state['promotions'] = payload;
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  setProcessAction,

  getBrandsRequestAction,
  getBrandsRequestFailAction,
  getBrandsRequestSuccessAction,

  createBrandRequestAction,
  createBrandRequestFailAction,
  createBrandRequestSuccessAction,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  createCategoryRequestAction,
  createCategoryRequestFailAction,
  createCategoryRequestSuccessAction,

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

  createTypesRequestAction,
  createTypesRequestFailAction,
  createTypesRequestSuccessAction,

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

  getGalleryRequestAction,
  getGalleryRequestFailAction,
  getGalleryRequestSuccessAction,

  createGalleryRequestAction,
  createGalleryRequestFailAction,
  createGalleryRequestSuccessAction,

  getPromotionsRequestAction,
  getPromotionsRequestFailAction,
  getPromotionsRequestSuccessAction,
} = productModifySlice['actions'];

export const selectTypes = (state) => state[REDUCER_NAME]['types'];
export const selectUnits = (state) => state[REDUCER_NAME]['units'];
export const selectBrands = (state) => state[REDUCER_NAME]['brands'];
export const selectGallery = (state) => state[REDUCER_NAME]['gallery'];
export const selectProduct = (state) => state[REDUCER_NAME]['product'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectCategories = (state) => state[REDUCER_NAME]['categories'];
export const selectCurrencies = (state) => state[REDUCER_NAME]['currencies'];
export const selectAttributes = (state) => state[REDUCER_NAME]['attributes'];
export const selectPromotions = (state) => state[REDUCER_NAME]['promotions'];
export const selectInCreateProcess = (state) => state[REDUCER_NAME]['inCreateProcess'];

export const name = productModifySlice['name'];
export const reducer = productModifySlice['reducer'];
