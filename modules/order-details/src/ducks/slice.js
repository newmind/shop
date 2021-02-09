
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  order: {},
  inProcess: false,
};

const REDUCER_NAME = 'order-details';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['order'] = {};
      state['inProcess'] = false;
    },

    getOrderRequestAction(state) {
      state['inProcess'] = true;
    },
    getOrderRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getOrderRequestSuccessAction(state, { payload }) {
      state['order'] = payload;
      state['inProcess'] = false;
    },
  }
});

export const {
  resetStateAction,

  getOrderRequestAction,
  getOrderRequestFailAction,
  getOrderRequestSuccessAction,
} = slice['actions'];

export const selectOrder = (state) => state[REDUCER_NAME]['order'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
