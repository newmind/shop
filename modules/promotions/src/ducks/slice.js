
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'promotions';


const currenciesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getPromotionsRequestAction() {},
    getPromotionsRequestFailAction() {},
    getPromotionsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createPromotionRequestAction(state) {
      state['inProcess'] = true;
    },
    createPromotionRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createPromotionRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((currency) => currency['uuid'] === payload['uuid'])) {
        state['items'] = [payload, ...state['items']];
      }
      state['inProcess'] = false;
    },

    updatePromotionRequestAction(state) {
      state['inProcess'] = true;
    },
    updatePromotionRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updatePromotionRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['uuid'] === payload['uuid']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deletePromotionRequestAction() {},
    deletePromotionRequestFailAction() {},
    deletePromotionRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['uuid']));
    },
  },
});

export const {
  resetStateAction,

  getPromotionsRequestAction,
  getPromotionsRequestFailAction,
  getPromotionsRequestSuccessAction,

  createPromotionRequestAction,
  createPromotionRequestFailAction,
  createPromotionRequestSuccessAction,

  updatePromotionRequestAction,
  updatePromotionRequestFailAction,
  updatePromotionRequestSuccessAction,

  deletePromotionRequestAction,
  deletePromotionRequestFailAction,
  deletePromotionRequestSuccessAction,
} = currenciesSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = currenciesSlice['name'];
export const reducer = currenciesSlice['reducer'];
