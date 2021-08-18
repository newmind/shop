
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  item: null,
  payments: [],
  deliveries: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'shop';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['item'] = null;
      state['payments'] = [];
      state['deliveries'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getDeliveriesRequestAction(state) {},
    getDeliveriesRequestFailAction(state) {},
    getDeliveriesRequestSuccessAction(state, { payload }) {
      state['deliveries'] = payload;
    },

    getPaymentsRequestAction(state) {},
    getPaymentsRequestFailAction(state) {},
    getPaymentsRequestSuccessAction(state, { payload }) {
      state['payments'] = payload;
    },

    getShopRequestAction(state) {
      state['inProcess'] = true;
    },
    getShopRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getShopRequestSuccessAction(state, { payload }) {
      state['item'] = payload;
      state['inProcess'] = false;
    },

    createShopRequestAction(state) {
      state['inProcess'] = true;
    },
    createShopRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createShopRequestSuccessAction(state) {
      state['inProcess'] = false;
    },

    updateShopRequestAction(state) {
      state['inProcess'] = true;
    },
    updateShopRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateShopRequestSuccessAction(state, { payload }) {
      state['item'] = {
        ...state['item'],
        ...payload,
      };
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getDeliveriesRequestAction,
  getDeliveriesRequestFailAction,
  getDeliveriesRequestSuccessAction,

  getPaymentsRequestAction,
  getPaymentsRequestFailAction,
  getPaymentsRequestSuccessAction,

  getShopRequestAction,
  getShopRequestFailAction,
  getShopRequestSuccessAction,

  createShopRequestAction,
  createShopRequestFailAction,
  createShopRequestSuccessAction,

  updateShopRequestAction,
  updateShopRequestFailAction,
  updateShopRequestSuccessAction,
} = slice['actions'];

export const selectItem = (state) => state[REDUCER_NAME]['item'];
export const selectPayments = (state) => state[REDUCER_NAME]['payments'];
export const selectDeliveries = (state) => state[REDUCER_NAME]['deliveries'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
