
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  uuid: [],
  items: [],
  amount: 0,
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'order';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['uuid'] = [];
      state['items'] = [];
      state['amount'] = 0;
      state['error'] = null;
      state['inProcess'] = false;
    },

    restoreStateAction(state) {
      const cart = window.localStorage.getItem('cart');
      const uuid = JSON.parse(cart) || [];

      state['uuid'] = uuid;
    },

    getProductsRequestAction() {},
    getProductsRequestFailAction() {},
    getProductsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    removeProductFromCartAction(state, { payload }) {
      const cart = window.localStorage.getItem('cart');
      const uuid = JSON.parse(cart) || [];

      const uuidIndex = uuid.findIndex(item => item === payload);
      const itemIndex = state['items'].findIndex(item => item['uuid'] === payload);

      const newUuid = [...uuid.slice(0, uuidIndex), ...uuid.slice(uuidIndex + 1)];
      const newItems = [...state['items'].slice(0, itemIndex), ...state['items'].slice(itemIndex + 1)];

      localStorage.setItem('cart', JSON.stringify(newUuid));
      state['uuid'] = newUuid;
      state['items'] = newItems;
    },

    getAmountRequestAction(state) {
      state['inProcess'] = true;
    },
    getAmountRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getAmountRequestSuccessAction(state, { payload }) {
      state['amount'] = payload;
      state['inProcess'] = false;
    },

    createOperationRequestAction(state) {
      state['inProcess'] = true;
    },
    createOperationRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createOperationRequestSuccessAction(state, { payload }) {
      state['uuid'] = payload;
      state['inProcess'] = false;
    }
  },
});

export const {
  resetStateAction,
  restoreStateAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  removeProductFromCartAction,

  getAmountRequestAction,
  getAmountRequestFailAction,
  getAmountRequestSuccessAction,

  createOperationRequestAction,
  createOperationRequestFailAction,
  createOperationRequestSuccessAction,
} = slice['actions'];

export const selectUuid = (state) => state[REDUCER_NAME]['uuid'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectAmount = (state) => state[REDUCER_NAME]['amount'];

export const name = slice['name'];
export const reducer = slice['reducer'];
