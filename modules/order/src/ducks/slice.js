
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  data: null,
  error: null,
  inProcess: false,
};


export const alice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetState(state) {
      state['data'] = null;
      state['error'] = null;
      state['inProcess'] = false;
    },

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

export const { resetState, createOperationAction, createOperationFailAction, createOperationSuccessAction } = alice['actions'];

export const selectData = (state) => state['order']['data'];

export const name = alice['name'];
export const reducer = alice['reducer'];
