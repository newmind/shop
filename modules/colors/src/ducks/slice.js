
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'colors';


const colorsSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getColorsRequestAction() {},
    getColorsRequestFailAction() {},
    getColorsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createColorRequestAction(state) {
      state['inProcess'] = true;
    },
    createColorRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createColorRequestSuccessAction(state, { payload }) {
      state['items'] = [payload, ...state['items']];
      state['inProcess'] = false;
    },

    updateColorRequestAction(state) {
      state['inProcess'] = true;
    },
    updateColorRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateColorRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteColorRequestAction() {},
    deleteColorRequestFailAction() {},
    deleteColorRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  getColorsRequestAction,
  getColorsRequestFailAction,
  getColorsRequestSuccessAction,

  createColorRequestAction,
  createColorRequestFailAction,
  createColorRequestSuccessAction,

  updateColorRequestAction,
  updateColorRequestFailAction,
  updateColorRequestSuccessAction,

  deleteColorRequestAction,
  deleteColorRequestFailAction,
  deleteColorRequestSuccessAction,
} = colorsSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = colorsSlice['name'];
export const reducer = colorsSlice['reducer'];
