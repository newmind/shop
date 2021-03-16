
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  profile: {},
  inProcess: false,
};

const REDUCER_NAME = 'profile';


const profileSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    resetStateAction(state) {
      state['profile'] = {};
      state['inProcess'] = false;
    },

    getProfileRequestAction(state) {
      state['inProcess'] = true;
    },
    getProfileRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getProfileRequestSuccessAction(state, { payload }) {
      state['profile'] = payload;
      state['inProcess'] = false;
    },

    updateUserRequestAction(state) {
      state['inProcess'] = true;
    },
    updateUserRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateUserRequestSuccessAction(state, { payload }) {
      state['profile']['user'] = payload;
      state['inProcess'] = false;
    },

    updateCustomerRequestAction(state) {
      state['inProcess'] = true;
    },
    updateCustomerRequestFailAction(state) {
      state['inProcess'] = false;
    },
    updateCustomerRequestSuccessAction(state, { payload }) {
      state['profile']['customer'] = payload;
      state['inProcess'] = false;
    },
  }
});

export const {
  resetStateAction,

  getProfileRequestAction,
  getProfileRequestFailAction,
  getProfileRequestSuccessAction,

  updateUserRequestAction,
  updateUserRequestFailAction,
  updateUserRequestSuccessAction,

  updateCustomerRequestAction,
  updateCustomerRequestFailAction,
  updateCustomerRequestSuccessAction,
} = profileSlice['actions'];

export const selectProfile = (state) => state[REDUCER_NAME]['profile'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = profileSlice['name'];
export const reducer = profileSlice['reducer'];
