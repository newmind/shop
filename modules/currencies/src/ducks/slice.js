
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'currencies';


const currenciesSlice = createSlice({
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
      if ( ! state['items'].some((currency) => currency['uuid'] === payload['uuid'])) {
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
        if (item['uuid'] === payload['uuid']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteCurrencyRequestAction() {},
    deleteCurrencyRequestFailAction() {},
    deleteCurrencyRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['uuid']));
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
} = currenciesSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = currenciesSlice['name'];
export const reducer = currenciesSlice['reducer'];
