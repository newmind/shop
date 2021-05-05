
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  types: [],
};

const REDUCER_NAME = 'main';

export const mainSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    getMainAction(state, { payload }) {

      state['types'] = payload['types'];
    },
  },
});

export const { getMainAction } = mainSlice['actions'];

export const selectTypes = (state) => state[REDUCER_NAME]['types'];

export const name = mainSlice['name'];
export const reducer = mainSlice['reducer'];
