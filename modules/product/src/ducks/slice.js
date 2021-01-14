
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  product: null,
  inProcess: false,
};

const REDUCER_NAME = 'product';


const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['product'] = null;
      state['inProcess'] = false;
    },

    getProductRequestAction() {},
    getProductRequestFailAction() {},
    getProductRequestSuccessAction(state, { payload }) {
      state['product'] = payload;
    },

    createCommentRequestAction(state) {
      state['inProcess'] = true;
    },
    createCommentRequestFailAction(state) {
      state['inProcess'] = false;
    },
    createCommentRequestSuccessAction(state, { payload }) {
      if (state['product']['uuid'] !== payload['productId']) {
        return  void 0;
      }

      if (state['product']['comments'].some((comment) => comment['id'] === payload['id'])) {
        return void 0;
      }

      state['product'] = {
        ...state['product'],
        comments: [payload, ...state['product']['comments']],
      };
    },
  }
});

export const {
  resetStateAction,

  getProductRequestAction,
  getProductRequestFailAction,
  getProductRequestSuccessAction,

  createCommentRequestAction,
  createCommentRequestFailAction,
  createCommentRequestSuccessAction,
} = slice['actions'];

export const selectProduct = (state) => state[REDUCER_NAME]['product'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
