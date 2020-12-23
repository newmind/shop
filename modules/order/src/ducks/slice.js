
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  data: null,
  error: null,
  inProcess: false,
};


export const showcaseSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOperationAction: (state) => {
      state['inProcess'] = true;
    },
    createOperationFailAction: (state) => {
      state['inProcess'] = false;
    },
    createOperationSuccessAction: (state, { payload }) => {
      state['data'] = payload;
      state['inProcess'] = false;
    }
  },
});

export const { createOperationAction, createOperationFailAction, createOperationSuccessAction } = showcaseSlice['actions'];

export const selectData = (state) => state['order']['data'];

export const reducer = showcaseSlice['reducer'];
