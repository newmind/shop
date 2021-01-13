
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'categories';


const categoriesSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['error'] = null;
      state['inProcess'] = false;
    },

    getCategoriesRequestAction() {},
    getCategoriesRequestFailAction() {},
    getCategoriesRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
    },

    createCategoryRequestAction(state) {
      state['inProcess'] = true;
    },
    createCategoryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createCategoryRequestSuccessAction(state, { payload }) {
      state['items'] = [payload, ...state['items']];
      state['inProcess'] = false;
    },

    updateCategoryRequestAction(state) {
      state['inProcess'] = true;
    },
    updateCategoryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateCategoryRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].map((item) => {
        if (item['id'] === payload['id']) {
          return payload;
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteCategoryRequestAction() {},
    deleteCategoryRequestFailAction() {},
    deleteCategoryRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
    },
  },
});

export const {
  resetStateAction,

  getCategoriesRequestAction,
  getCategoriesRequestFailAction,
  getCategoriesRequestSuccessAction,

  createCategoryRequestAction,
  createCategoryRequestFailAction,
  createCategoryRequestSuccessAction,

  updateCategoryRequestAction,
  updateCategoryRequestFailAction,
  updateCategoryRequestSuccessAction,

  deleteCategoryRequestAction,
  deleteCategoryRequestFailAction,
  deleteCategoryRequestSuccessAction,
} = categoriesSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = categoriesSlice['name'];
export const reducer = categoriesSlice['reducer'];
