
import { createSlice } from '@reduxjs/toolkit';
import {UUID} from "@ui.packages/utils";


const initialState = {
  items: [],
};


export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    closeNotification(state, { payload }) {
      state['items'] = state['items'].filter(item => item['uuid'] !== payload);
    },
    pushNotification(state, { payload }) {
      payload['uuid'] = UUID();
      state['items'] = [payload, ...state['items']];
    },
    cleanNotifications(state) {
      state['items'] = [];
    }
  },
});

export const { closeNotification, pushNotification, cleanNotifications } = notificationSlice['actions'];

export const selectNotifications = (state) => state['notifications']['items'];

export const reducer = notificationSlice['reducer'];
