
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

    getCustomersRequestAction(state) {
      state['inProcess'] = true;
    },
    getCustomersRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getCustomersRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },

    createCustomerRequestAction(state) {
      state['inProcess'] = true;
    },
    createCustomerRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createCustomerRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((customer) => customer['id'] === payload['id'])) {
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

    deleteCustomerRequestAction(state) {
      state['inProcess'] = true;
    },
    deleteCustomerRequestFailAction(state) {
      state['inProcess'] = false;
    },
    deleteCustomerRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['uuid']));
      state['inProcess'] = false;
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
