
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  meta: {},
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'customers';


const currenciesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['meta'] = {};
      state['error'] = null;
      state['inProcess'] = false;
    },

    getCustomersRequestAction() {},
    getCustomersRequestFailAction() {},
    getCustomersRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
    },

    createCustomerRequestAction(state) {
      state['inProcess'] = true;
    },
    createCustomerRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createCustomerRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((currency) => currency['uuid'] === payload['uuid'])) {
        state['items'] = [payload, ...state['items']];
      }
      state['inProcess'] = false;
    },

    updateCustomerRequestAction(state) {
      state['inProcess'] = true;
    },
    updateCustomerRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateCustomerRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['uuid'] === payload['uuid']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteCustomerRequestAction() {},
    deleteCustomerRequestFailAction() {},
    deleteCustomerRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['uuid']));
    },
  },
});

export const {
  resetStateAction,

  getCustomersRequestAction,
  getCustomersRequestFailAction,
  getCustomersRequestSuccessAction,

  createCustomerRequestAction,
  createCustomerRequestFailAction,
  createCustomerRequestSuccessAction,

  updateCustomerRequestAction,
  updateCustomerRequestFailAction,
  updateCustomerRequestSuccessAction,

  deleteCustomerRequestAction,
  deleteCustomerRequestFailAction,
  deleteCustomerRequestSuccessAction,
} = currenciesSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = currenciesSlice['name'];
export const reducer = currenciesSlice['reducer'];
