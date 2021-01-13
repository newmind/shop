
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'forms';


const formsSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getFormsRequestAction() {},
    getFormsRequestFailAction() {},
    getFormsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createFormRequestAction(state) {
      state['inProcess'] = true;
    },
    createFormRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createFormRequestSuccessAction(state, { payload }) {
      state['items'] = [payload, ...state['items']];
      state['inProcess'] = false;
    },

    updateFormRequestAction(state) {
      state['inProcess'] = true;
    },
    updateFormRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateFormRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteFormRequestAction() {},
    deleteFormRequestFailAction() {},
    deleteFormRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  getFormsRequestAction,
  getFormsRequestFailAction,
  getFormsRequestSuccessAction,

  createFormRequestAction,
  createFormRequestFailAction,
  createFormRequestSuccessAction,

  updateFormRequestAction,
  updateFormRequestFailAction,
  updateFormRequestSuccessAction,

  deleteFormRequestAction,
  deleteFormRequestFailAction,
  deleteFormRequestSuccessAction,
} = formsSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = formsSlice['name'];
export const reducer = formsSlice['reducer'];
