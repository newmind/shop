
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  filter: {},
  meta: {
    total: 0,
  },
};

const REDUCER_NAME = 'products';


const productsSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetState(state) {
      state['items'] = [];
      state['filter'] = {};
      state['meta'] = {
        total: 0,
      };
    },

    getProductsRequestAction(state) {},
    getProductsRequestFailAction(state) {},
    getProductsRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['filter'] = payload['filter'];
      state['meta'] = payload['meta'];
    },

    createProductRequestAction() {},
    createProductRequestFailAction() {},
    createProductRequestSuccessAction(state, { payload }) {
      if (state['items'].some((item) => (item['id'] === payload['id']))) {
        return void 0;
      }
      state['items'] = [...state['items'], payload].sort((left, right) => {
        if (left['id'] > right['id']) {
          return 1;
        }
        else if (left['id'] < right['id']) {
          return -1;
        }
        return 0;
      });
    },

    removeProductRequestAction() {},
    removeProductRequestFailRequest() {},
    removeProductRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => (payload.indexOf(item['uuid']) === -1));
    },

    updateProductAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
    }
  }
});

export const {
  resetState,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  createProductRequestAction,
  createProductRequestFailAction,
  createProductRequestSuccessAction,

  removeProductRequestAction,
  removeProductRequestFailRequest,
  removeProductRequestSuccessAction,

  updateProductAction,
} = productsSlice['actions'];

export const name = productsSlice['name'];
export const reducer = productsSlice['reducer'];
