
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'shops';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getShopsRequestAction(state) {
      state['inProcess'] = true;
    },
    getShopsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getShopsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
      state['inProcess'] = false;
    },

    deleteShopsRequestAction(state) {
      state['inProcess'] = true;
    },
    deleteShopsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    deleteShopsRequestSuccessAction(state, { payload }) {
      state['items'] = state['items'].filter((item) => !~ payload.indexOf(item['uuid']));
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getShopsRequestAction,
  getShopsRequestFailAction,
  getShopsRequestSuccessAction,

  deleteShopsRequestAction,
  deleteShopsRequestFailAction,
  deleteShopsRequestSuccessAction,
} = slice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
