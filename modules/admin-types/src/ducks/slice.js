
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'types';


const typesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getTypesRequestAction(state) {
      state['inProcess'] = true;
    },
    getTypesRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getTypesRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
      state['inProcess'] = false;
    },

    createTypeRequestAction(state) {
      state['inProcess'] = true;
    },
    createTypeRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createTypeRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((item) => item['id'] === payload['id'])) {
        state['items'] = [payload, ...state['items']];
      }
      state['inProcess'] = false;
    },

    updateTypeRequestAction(state) {
      state['inProcess'] = true;
    },
    updateTypeRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateTypeRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteTypeRequestAction(state) {
      state['inProcess'] = true;
    },
    deleteTypeRequestFailAction(state) {
      state['inProcess'] = false;
    },
    deleteTypeRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
      state['inProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  getTypesRequestAction,
  getTypesRequestFailAction,
  getTypesRequestSuccessAction,

  createTypeRequestAction,
  createTypeRequestFailAction,
  createTypeRequestSuccessAction,

  updateTypeRequestAction,
  updateTypeRequestFailAction,
  updateTypeRequestSuccessAction,

  deleteTypeRequestAction,
  deleteTypeRequestFailAction,
  deleteTypeRequestSuccessAction,
} = typesSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
