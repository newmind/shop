
import { createAction, createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  types: [],
  forms: [],
  brands: [],
  colors: [],
  materials: [],
  categories: [],
  meta: {},
  inProcess: false,
  isInitialize: false,
};

const REDUCER_NAME = 'showcase';
const SOCKET_PRODUCT_UPDATED = createAction('@@socket/PRODUCT_UPDATED');


export const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    getProductsAction: (state) => {
      state['inProcess'] = true;
    },
    getProductsFailAction: (state) => {
      state['inProcess'] = false;
    },
    getProductsSuccessAction: (state, { payload }) => {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['types'] = payload['filter']['types'];
      state['forms'] = payload['filter']['forms'];
      state['brands'] = payload['filter']['brands'];
      state['colors'] = payload['filter']['colors'];
      state['materials'] = payload['filter']['materials'];
      state['categories'] = payload['filter']['categories'];
      state['isInitialize'] = true;
      state['inProcess'] = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(SOCKET_PRODUCT_UPDATED, function(state, { payload }) {
        state['items'] = state['items'].map((item) => {
          if (item['uuid'] === payload['uuid']) {
            return {
              ...item,
              ...payload,
            };
          }
          return item;
        });
      });
  },
});

export const { nextPageAction, getProductsAction, getProductsFailAction, getProductsSuccessAction } = slice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectMeta = (state) => state[REDUCER_NAME]['meta'];

export const name = slice['name'];
export const reducer = slice['reducer'];
