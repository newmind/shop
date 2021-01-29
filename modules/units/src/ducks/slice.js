
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'units';


const unitsSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getUnitsRequestAction() {},
    getUnitsRequestFailAction() {},
    getUnitsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createUnitRequestAction(state) {
      state['inProcess'] = true;
    },
    createUnitRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createUnitRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((item) => item['id'] === payload['id'])) {
        state['items'] = [payload, ...state['items']];
      }
      state['inProcess'] = false;
    },

    updateUnitRequestAction(state) {
      state['inProcess'] = true;
    },
    updateUnitRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateUnitRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteUnitRequestAction() {},
    deleteUnitRequestFailAction() {},
    deleteUnitRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  getUnitsRequestAction,
  getUnitsRequestFailAction,
  getUnitsRequestSuccessAction,

  createUnitRequestAction,
  createUnitRequestFailAction,
  createUnitRequestSuccessAction,

  updateUnitRequestAction,
  updateUnitRequestFailAction,
  updateUnitRequestSuccessAction,

  deleteUnitRequestAction,
  deleteUnitRequestFailAction,
  deleteUnitRequestSuccessAction,
} = unitsSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = unitsSlice['name'];
export const reducer = unitsSlice['reducer'];
