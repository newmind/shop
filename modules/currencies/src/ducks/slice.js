
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'currencies';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getCurrenciesRequestAction() {},
    getCurrenciesRequestFailAction() {},
    getCurrenciesRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createCurrencyRequestAction(state) {
      state['inProcess'] = true;
    },
    createCurrencyRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createCurrencyRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((currency) => currency['id'] === payload['id'])) {
        state['items'] = [payload, ...state['items']];
      }
      state['inProcess'] = false;
    },

    updateCurrencyRequestAction(state) {
      state['inProcess'] = true;
    },
    updateCurrencyRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateCurrencyRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteCurrencyRequestAction() {},
    deleteCurrencyRequestFailAction() {},
    deleteCurrencyRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  getCurrenciesRequestAction,
  getCurrenciesRequestFailAction,
  getCurrenciesRequestSuccessAction,

  createCurrencyRequestAction,
  createCurrencyRequestFailAction,
  createCurrencyRequestSuccessAction,

  updateCurrencyRequestAction,
  updateCurrencyRequestFailAction,
  updateCurrencyRequestSuccessAction,

  deleteCurrencyRequestAction,
  deleteCurrencyRequestFailAction,
  deleteCurrencyRequestSuccessAction,
} = slice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
