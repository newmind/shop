
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  uuid: [],
  items: [],
  payments: [],
  deliveries: [],
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
      state['uuid'] = JSON.parse(cart) || [];
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
    createOperationRequestSuccessAction(state) {
      state['inProcess'] = false;
    },

    getPaymentsRequestAction(state) {},
    getPaymentsRequestFailAction(state) {},
    getPaymentsRequestSuccessAction(state, { payload }) {
      state['payments'] = payload;
    },

    getDeliveriesRequestAction(state) {},
    getDeliveriesRequestFailAction(state) {},
    getDeliveriesRequestSuccessAction(state, { payload }) {
      state['deliveries'] = payload;
    },
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

  getPaymentsRequestAction,
  getPaymentsRequestFailAction,
  getPaymentsRequestSuccessAction,

  getDeliveriesRequestAction,
  getDeliveriesRequestFailAction,
  getDeliveriesRequestSuccessAction,
} = slice['actions'];

export const selectUuid = (state) => state[REDUCER_NAME]['uuid'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectPayments = (state) => state[REDUCER_NAME]['payments'];
export const selectDeliveries = (state) => state[REDUCER_NAME]['deliveries'];
export const selectAmount = (state) => state[REDUCER_NAME]['amount'];

export const name = slice['name'];
export const reducer = slice['reducer'];
