
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

    getCategoriesRequestAction(state) {
      state['inProcess'] = true;
    },
    getCategoriesRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getCategoriesRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
      state['inProcess'] = false;
    },

    createCategoryRequestAction(state) {
      state['inProcess'] = true;
    },
    createCategoryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createCategoryRequestSuccessAction(state, { payload }) {
      if (payload['parentId']) {
        state['items'] = state['items'].map((item) => {
          if ( ! item['sub-categories'].some(attr => attr['id'] === payload['id'])) {
            if (item['id'] === payload['parentId']) {
              return {
                ...item,
                'sub-categories': [
                  ...item['sub-categories'],
                  payload,
                ],
              }
            }
          }
          return item;
        });
      }
      else {
        if ( ! state['items'].some(attr => attr['id'] === payload['id'])) {
          state['items'] = [
            {
              ...payload,
              'sub-categories': [],
            },
            ...state['items'
          ]];
        }
      }
      state['inProcess'] = false;
    },

    updateCategoryRequestAction(state) {
      state['inProcess'] = true;
    },
    updateCategoryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateCategoryRequestSuccessAction(state, { payload }) {
      state['items'] = state['items'].map((item) => {
        if (item['id'] === payload['id']) {
          return {
            ...item,
            ...payload,
          };
        }
        else if ( !! item['sub-categories'].length) {
          return {
            ...item,
            'sub-categories': item['sub-categories'].map((sub) => {
              if (sub['id'] === payload['id']) {
                return {
                  ...sub,
                  ...payload,
                };
              }
              return sub;
            }),
          };
        }
        return item;
      });
      state['inProcess'] = false;
    },

    deleteCategoryRequestAction(state) {
      state['inProcess'] = true;
    },
    deleteCategoryRequestFailAction(state) {
      state['inProcess'] = false;
    },
    deleteCategoryRequestSuccessAction(state, { payload }) {
      if ( ! state['items'].some((item) => !!~ payload.indexOf(item['id']))) {
        state['items'] = state['items'].map((item) => {
          if ( !! item['sub-categories'].length) {
            return {
              ...item,
              'sub-categories': item['sub-categories'].filter((item) => !~ payload.indexOf(item['id'])),
            };
          }
          return item;
        });
      }
      else {
        state['items'] = [...state['items']].filter((item) => !~ payload.indexOf(item['id']));
      }
      state['inProcess'] = false;
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
