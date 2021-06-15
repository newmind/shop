
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  types: [],
  brands: [],
  categories: [],
  meta: {},
  product: null,
  inProcess: false,
  inViewProcess: false,
  isInitialize: false,
};

const REDUCER_NAME = 'client-showcase';


export const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetState(state) {
      state['items'] = [];
      state['meta'] = {};
      state['types'] = [];
      state['brands'] = [];
      state['categories'] = [];
      state['isInitialize'] = false;
      state['inProcess'] = false;
    },

    resetProductAction(state) {
      state['product'] = null;
    },

    getProductsAction: (state) => {
      state['inProcess'] = true;
    },
    getProductsFailAction: (state) => {
      state['inProcess'] = false;
    },
    getProductsSuccessAction: (state, { payload }) => {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['types'] = payload['filter']['types'];
      state['brands'] = payload['filter']['brands'];
      state['categories'] = payload['filter']['categories'];
      state['isInitialize'] = true;
      state['inProcess'] = false;
    },

    getProductRequestAction(state) {
      state['inViewProcess'] = true;
    },
    getProductRequestFailAction(state) {
      state['inViewProcess'] = false;
    },
    getProductRequestSuccessAction(state, { payload }) {
      state['inViewProcess'] = false;
      state['product'] = payload;
    },
  },
});

export const {
  resetState,

  resetProductAction,

  getProductsAction,
  getProductsFailAction,
  getProductsSuccessAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,
} = slice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectTypes = (state) => state[REDUCER_NAME]['types'];
export const selectBrands = (state) => state[REDUCER_NAME]['brands'];
export const selectProduct = (state) => state[REDUCER_NAME]['product'];
export const selectCategories = (state) => state[REDUCER_NAME]['categories'];
export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];
export const selectInViewProcess = (state) => state[REDUCER_NAME]['inViewProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
