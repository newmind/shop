
import { createSlice } from '@reduxjs/toolkit';


const REDUCER_NAME = 'application';

const initialState = {
  profile: null,
  isAuth: false,
  isLoaded: false,
  inProcess: false,
};


const applicationSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    isLoaded(state) {
      state['isLoaded'] = true;
    },

    signInRequestAction(state) {
      state['inProcess'] = true;
    },
    signInRequestFailAction(state) {
      state['inProcess'] = false;
    },
    signInRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['profile'] = payload;
    },

    getProfileRequestAction(state) {},
    getProfileRequestFailAction(state) {},
    getProfileRequestSuccessAction(state, { payload }) {
      state['profile'] = payload;
    },

    signOutRequestAction(state) {
      state['inProcess'] = false;
    },
    signOutRequestFailAction(state) {
      state['inProcess'] = false;
    },
    signOutRequestSuccessAction(state) {
      state['inProcess'] = false;
    },
  }
});

export const {
  isLoaded,

  signInRequestAction,
  signInRequestFailAction,
  signInRequestSuccessAction,

  getProfileRequestAction,
  getProfileRequestFailAction,
  getProfileRequestSuccessAction,

  signOutRequestAction,
  signOutRequestFailAction,
  signOutRequestSuccessAction,
} = applicationSlice['actions'];

export const selectIsAuth = (state) => state[REDUCER_NAME]['isAuth'];
export const selectProfile = (state) => state[REDUCER_NAME]['profile'];
export const selectIsLoaded = (state) => state[REDUCER_NAME]['isLoaded'];
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = applicationSlice['name'];
export const reducer = applicationSlice['reducer'];
