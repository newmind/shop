
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'deliveries';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getDeliveriesRequestAction(state) {
      state['inProcess'] = true;
    },
    getDeliveriesRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getDeliveriesRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
      state['inProcess'] = false;
    },

    updateDeliveryRequestAction(state) {
      state['inProcess'] = true;
    },
    updateDeliveryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateDeliveryRequestSuccessAction(state, { payload }) {
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

  getDeliveriesRequestAction,
  getDeliveriesRequestFailAction,
  getDeliveriesRequestSuccessAction,

  updateDeliveryRequestAction,
  updateDeliveryRequestFailAction,
  updateDeliveryRequestSuccessAction,
} = slice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
