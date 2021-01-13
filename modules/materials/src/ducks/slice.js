
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'materials';


const materialsSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getMaterialsRequestAction() {},
    getMaterialsRequestFailAction() {},
    getMaterialsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createMaterialRequestAction(state) {
      state['inProcess'] = true;
    },
    createMaterialRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createMaterialRequestSuccessAction(state, { payload }) {
      state['items'] = [payload, ...state['items']];
      state['inProcess'] = false;
    },

    updateMaterialRequestAction(state) {
      state['inProcess'] = true;
    },
    updateMaterialRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateMaterialRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteMaterialRequestAction() {},
    deleteMaterialRequestFailAction() {},
    deleteMaterialRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  getMaterialsRequestAction,
  getMaterialsRequestFailAction,
  getMaterialsRequestSuccessAction,

  createMaterialRequestAction,
  createMaterialRequestFailAction,
  createMaterialRequestSuccessAction,

  updateMaterialRequestAction,
  updateMaterialRequestFailAction,
  updateMaterialRequestSuccessAction,

  deleteMaterialRequestAction,
  deleteMaterialRequestFailAction,
  deleteMaterialRequestSuccessAction,
} = materialsSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = materialsSlice['name'];
export const reducer = materialsSlice['reducer'];
