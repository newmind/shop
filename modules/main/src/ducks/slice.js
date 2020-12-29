
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  types: [],
  categories: [],
};


export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    getTypesAction(state, { payload }) {
      state['types'] = payload;
    },
    getCategoriesAction(state, { payload }) {
      state['categories'] = payload;
    },
  },
});

export const { getTypesAction, getCategoriesAction } = mainSlice['actions'];

export const selectTypes = (state) => state['main']['items'];
export const selectCategories = (state) => state['main']['categories'];

export const name = mainSlice['name'];
export const reducer = mainSlice['reducer'];
