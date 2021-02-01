
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'brands';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getBrandsRequestAction() {},
    getBrandsRequestFailAction() {},
    getBrandsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createBrandRequestAction(state) {
      state['inProcess'] = true;
    },
    createBrandRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createBrandRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((currency) => currency['id'] === payload['id'])) {
        state['items'] = [payload, ...state['items']];
      }
      state['inProcess'] = false;
    },

    updateBrandRequestAction(state) {
      state['inProcess'] = true;
    },
    updateBrandRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateBrandRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteBrandRequestAction() {},
    deleteBrandRequestFailAction() {},
    deleteBrandRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  getBrandsRequestAction,
  getBrandsRequestFailAction,
  getBrandsRequestSuccessAction,

  createBrandRequestAction,
  createBrandRequestFailAction,
  createBrandRequestSuccessAction,

  updateBrandRequestAction,
  updateBrandRequestFailAction,
  updateBrandRequestSuccessAction,

  deleteBrandRequestAction,
  deleteBrandRequestFailAction,
  deleteBrandRequestSuccessAction,
} = slice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
