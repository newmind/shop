
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  promotions: [],
  filter: {},
  meta: {},
  inProcess: false,
};

const REDUCER_NAME = 'products';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetState(state) {
      state['items'] = [];
      state['promotions'] = [];
      state['filter'] = {};
      state['meta'] = {};
      state['inProcess'] = false;
    },

    getPromotionsRequestAction() {},
    getPromotionsRequestFailAction() {},
    getPromotionsRequestSuccessAction(state, { payload }) {
      state['promotions'] = payload;
    },

    getProductsRequestAction(state) {
      state['inProcess'] = true;
    },
    getProductsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getProductsRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['filter'] = payload['filter'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },

    updateProductsRequestAction(state) {
      state['inProcess'] = true;
    },
    updateProductsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateProductsRequestSuccessAction(state, { payload }) {
      state['items'] = state['items'].map((item) => {
        if (item['uuid'] === payload['uuid']) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      });
      state['inProcess'] = false;
    },

    removeProductRequestAction(state) {
      state['inProcess'] = true;
    },
    removeProductRequestFailRequest(state) {
      state['inProcess'] = false;
    },
    removeProductRequestSuccessAction(state) {
      state['inProcess'] = false;
    },

    copyProductRequestAction(state) {
      state['inProcess'] = true;
    },
    copyProductRequestFailRequest(state) {
      state['inProcess'] = false;
    },
    copyProductRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['items'] = [payload, ...state['items'].slice(0, -1)];
      state['meta'] = {
        total: state['meta']['total'] + 1,
      };
    },

    removeImageAction(state, { payload }) {
      state['items'] = state['items'].map((item) => ({
        ...item,
        gallery: item['gallery'].filter((img) => payload.some((uuid) => uuid !== img)),
      }));
    }
  }
});

export const {
  resetState,

  getPromotionsRequestAction,
  getPromotionsRequestFailAction,
  getPromotionsRequestSuccessAction,

  setPromotionRequestAction,
  setPromotionRequestFailAction,
  setPromotionRequestSuccessAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  updateProductsRequestAction,
  updateProductsRequestFailAction,
  updateProductsRequestSuccessAction,

  removeProductRequestAction,
  removeProductRequestFailRequest,
  removeProductRequestSuccessAction,

  copyProductRequestAction,
  copyProductRequestFailRequest,
  copyProductRequestSuccessAction,

  removeImageAction,
} = slice['actions'];

export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectPromotions = (state) => state[REDUCER_NAME]['promotions'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectFilter = (state) => state[REDUCER_NAME]['filter'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
