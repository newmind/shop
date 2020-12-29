
import { createSlice } from '@reduxjs/toolkit';


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


export const showcaseSlice = createSlice({
  name: 'showcase',
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
});

export const { nextPageAction, getProductsAction, getProductsFailAction, getProductsSuccessAction } = showcaseSlice['actions'];

export const selectItems = (state) => state['showcase']['items'];
export const selectMeta = (state) => state['showcase']['meta'];

export const name = showcaseSlice['name'];
export const reducer = showcaseSlice['reducer'];
