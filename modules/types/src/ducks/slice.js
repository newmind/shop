
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  categories: [],
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
      state['categories'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getCategoriesRequestAction() {},
    getCategoriesRequestFailAction() {},
    getCategoriesRequestSuccessAction(state, { payload }) {
      state['categories'] = payload;
    },

    createCategoryRequestSuccessAction(state, { payload }) {
      state['categories'] = [payload, ...state['categories']];
    },

    updateCategoryRequestSuccessAction(state, { payload }) {
      state['items'] = state['items'].map((item) => {
        return {
          ...item,
          categories: item['categories'].map((category) => {
            if (category['id'] === payload['id']) {
              return {
                ...category,
                ...payload,
              };
            }
            return category;
          }),
        }
      });
    },

    deleteCategoryRequestSuccessAction(state, { payload }) {
      state['categories'] = [...state['categories']].filter((item) => !~ payload.indexOf(item['id']));
      state['items'] = state['items'].map((item) => {
        return {
          ...item,
          categories: item['categories'].filter((item) => !~ payload.indexOf(item['id'])),
        }
      });
    },

    getTypesRequestAction() {},
    getTypesRequestFailAction() {},
    getTypesRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createTypeRequestAction(state) {
      state['inProcess'] = true;
    },
    createTypeRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createTypeRequestSuccessAction(state, { payload }) {
      state['items'] = [payload, ...state['items']];
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

    deleteTypeRequestAction() {},
    deleteTypeRequestFailAction() {},
    deleteTypeRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  createCategoryRequestSuccessAction,
  updateCategoryRequestSuccessAction,
  deleteCategoryRequestSuccessAction,

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
export const selectCategories = (state) => state[REDUCER_NAME]['categories'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = typesSlice['name'];
export const reducer = typesSlice['reducer'];
