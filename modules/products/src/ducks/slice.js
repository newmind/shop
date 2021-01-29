
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
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
      state['filter'] = {};
      state['meta'] = {};
      state['inProcess'] = false;
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
    },

    removeProductRequestAction() {},
    removeProductRequestFailRequest() {},
    removeProductRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => (payload.indexOf(item['uuid']) === -1));
    },
  }
});

export const {
  resetState,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  updateProductsRequestSuccessAction,

  removeProductRequestAction,
  removeProductRequestFailRequest,
  removeProductRequestSuccessAction,
} = slice['actions'];

export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectFilter = (state) => state[REDUCER_NAME]['filter'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
