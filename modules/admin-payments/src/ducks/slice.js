
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'payments';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getPaymentsRequestAction(state) {
      state['inProcess'] = true;
    },
    getPaymentsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getPaymentsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
      state['inProcess'] = false;
    },

    updatePaymentRequestAction(state) {
      state['inProcess'] = true;
    },
    updatePaymentRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updatePaymentRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['code'] === payload['code']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getPaymentsRequestAction,
  getPaymentsRequestFailAction,
  getPaymentsRequestSuccessAction,

  updatePaymentRequestAction,
  updatePaymentRequestFailAction,
  updatePaymentRequestSuccessAction,
} = typesSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
