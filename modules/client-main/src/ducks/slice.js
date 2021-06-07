
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  types: [],
  product: null,
  inProcess: false,
};

const REDUCER_NAME = 'main';


export const mainSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetAction(state) {
      state['types'] = [];
      state['product'] = null;
      state['inProcess'] = false;
    },

    getMainAction(state, { payload }) {
      state['types'] = payload['types'];
    },

    resetProductAction(state) {
      state['product'] = null;
    },

    getProductRequestAction(state) {
      state['inProcess'] = true;
    },
    getProductRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getProductRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['product'] = payload;
    },
  },
});

export const {
  resetAction,

  getMainAction,

  resetProductAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,
} = mainSlice['actions'];

export const selectTypes = (state) => state[REDUCER_NAME]['types'];
export const selectProduct = (state) => state[REDUCER_NAME]['product'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = mainSlice['name'];
export const reducer = mainSlice['reducer'];
