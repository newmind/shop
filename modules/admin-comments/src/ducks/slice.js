
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],
  meta: {},
  error: null,
  inProcess: false,
};

const REDUCER_NAME = 'comments';


const commentsSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['items'] = [];
      state['meta'] = {};
      state['error'] = null;
      state['inProcess'] = false;
    },

    getCommentsRequestAction(state) {
      state['inProcess'] = true;
    },
    getCommentsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getCommentsRequestSuccessAction(state, { payload }) {
      state['items'] = payload['data'];
      state['meta'] = payload['meta'];
      state['inProcess'] = false;
    },

    removeCommentRequestAction(state) {
      state['inProcess'] = true;
    },
    removeCommentRequestFailAction(state) {
      state['inProcess'] = false;
    },
    removeCommentRequestSuccessAction(state, { payload }) {
      state['items'] = [...state['items']].filter((item) => payload.indexOf(item['id']) === -1);
      state['inProcess'] = false;
    },
  }
});

export const {
  resetStateAction,

  getCommentsRequestAction,
  getCommentsRequestFailAction,
  getCommentsRequestSuccessAction,

  removeCommentRequestAction,
  removeCommentRequestFailAction,
  removeCommentRequestSuccessAction,
} = commentsSlice['actions'];

export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectMeta = (state) => state[REDUCER_NAME]['meta'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = commentsSlice['name'];
export const reducer = commentsSlice['reducer'];
