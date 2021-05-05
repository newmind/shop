
import { createSlice, createAction } from '@reduxjs/toolkit';


const initialState = {
  product: null,
  inProcess: false,
};

const REDUCER_NAME = 'product';
const SOCKET_COMMENT_CREATED = createAction('@@socket/COMMENT_CREATED');
const SOCKET_PRODUCT_UPDATED = createAction('@@socket/PRODUCT_UPDATED');


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
  },
  extraReducers(builder) {
    builder
      .addCase(SOCKET_COMMENT_CREATED, function(state, { payload }) {
        if ( ! state['product']) {
          return void 0;
        }

        if (state['product']['uuid'] !== payload['productId']) {
          return  void 0;
        }

        if (state['product']['comments'].some((item) => item['id'] === payload['id'])) {
          return void 0;
        }

        state['product'] = {
          ...state['product'],
          comments: [
            payload,
            ...state['product']['comments'],
          ]
        };
      })
      .addCase(SOCKET_PRODUCT_UPDATED, function(state, { payload }) {
        if ( ! state['product']) {
          return void 0;
        }

        if (state['product']['uuid'] !== payload['uuid']) {
          return  void 0;
        }

        state['product'] = {
          ...state['product'],
          ...payload,
        };
      });
  },
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
