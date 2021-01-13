
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  profile: null,
  isAuth: false,
  isLoading: true,
};


const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    applicationHasLoadedAction(state) {
      state['isLoading'] = false;
    },

    changeStateAction(state, { payload }) {
      state['isAuth'] = payload;
    },

    applicationAuthRequestAction(state) {
      state['inProcess'] = true;
    },
    applicationAuthRequestFailAction(state) {
      state['inProcess'] = false;
    },
    applicationAuthRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['profile'] = payload;
    },

    applicationGetProfileRequestAction(state) {
      state['inProcess'] = true;
    },
    applicationGetProfileRequestFailAction(state) {
      state['inProcess'] = false;
    },
    applicationGetProfileRequestSuccessAction(state, { payload }) {
      state['inProcess'] = false;
      state['profile'] = payload;
    },

    applicationSignOutRequestAction(state) {
      state['inProcess'] = false;
    },
    applicationSignOutRequestFailAction(state) {
      state['inProcess'] = false;
    },
    applicationSignOutRequestSuccessAction(state) {
      state['inProcess'] = false;
    },
  }
});

export const {
  changeStateAction,
  applicationHasLoadedAction,

  applicationAuthRequestAction,
  applicationAuthRequestFailAction,
  applicationAuthRequestSuccessAction,

  applicationGetProfileRequestAction,
  applicationGetProfileRequestFailAction,
  applicationGetProfileRequestSuccessAction,

  applicationSignOutRequestAction,
  applicationSignOutRequestFailAction,
  applicationSignOutRequestSuccessAction,
} = applicationSlice['actions'];

export const selectIsAuth = (state) => state['application']['isAuth'];
export const selectProfile = (state) => state['application']['profile'];
export const selectInProcess = (state) => state['application']['inProcess'];
export const selectIsLoading = (state) => state['application']['isLoading'];

export const name = applicationSlice['name'];
export const reducer = applicationSlice['reducer'];
