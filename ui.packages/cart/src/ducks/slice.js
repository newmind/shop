
import { isJSON } from '@ui.packages/utils';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  uuid: [],
  items: [],
  amount: [],
  isOpen: false,
  inProductProcess: true,
  inAmountProcess: true,
};

const REDUCER_NAME = 'cart';


export const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    openCartAction(state) {
      state['isOpen'] = true;
    },
    closeCartAction(state) {
      state['isOpen'] = false;
    },

    addProductToCartAction(state, { payload }) {
      const { localStorage } = window;
      let newItems;
      if (state['uuid'].some(item => item[0] === payload)) {
        newItems = state['uuid'].map(item => {
          if (item[0] === payload) {
            return [item[0], ++item[1]];
          }
          return item;
        });
      }
      else {
        newItems = [
          ...state['uuid'],
          [payload, 1],
        ];
      }
      state['uuid'] = newItems;
      localStorage.setItem('cart', JSON.stringify(newItems));
    },
    removeProductFromCartAction(state, { payload }) {
      const items = [...state['uuid']];
      const index = items.findIndex(item => item[0] === payload);

      let newItems;
      if (items[index][1] > 1) {
        newItems = [
          ...items.slice(0, index),
          [items[index][0], --items[index][1]],
          ...items.slice(index + 1),
        ];
      }
      else {
        newItems = [
          ...items.slice(0, index),
          ...items.slice(index + 1),
        ];
      }

      state['uuid'] = newItems;
      localStorage.setItem('cart', JSON.stringify(newItems));
    },

    restoreCartAction(state) {
      const store = localStorage.getItem('cart');

      if (store) {
        if (isJSON(store)) {
          state['uuid'] = JSON.parse(store);
        }
        else {
          localStorage.setItem('cart', '[]');
        }
      }
    },
    resetCartAction(state) {
      state['uuid'] = [];
      localStorage.removeItem('cart');
      localStorage.setItem('cart', '[]');
    },

    resetStateAction(state) {
      state['items'] = [];
      state['amount'] = [];
      state['inAmountProcess'] = false;
      state['inProductProcess'] = false;
    },

    getProductsRequestAction(state) {
      state['inProductProcess'] = true;
    },
    getProductsRequestFailAction(state) {
      state['inProductProcess'] = false;
    },
    getProductsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
      state['inProductProcess'] = false;
    },

    getAmountRequestAction(state) {
      state['inAmountProcess'] = true;
    },
    getAmountRequestFailAction(state) {
      state['inAmountProcess'] = false;
    },
    getAmountRequestSuccessAction(state, { payload }) {
      state['amount'] = payload;
      state['inAmountProcess'] = false;
    },
  },
});

export const {
  resetStateAction,

  openCartAction,
  closeCartAction,

  addProductToCartAction,
  removeProductFromCartAction,

  restoreCartAction,
  resetCartAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  getAmountRequestAction,
  getAmountRequestFailAction,
  getAmountRequestSuccessAction,
} = slice['actions'];

export const selectUuid = (state) => state[REDUCER_NAME]['uuid'];
export const selectItems = (state) => state[REDUCER_NAME]['items'];
export const selectAmount = (state) => state[REDUCER_NAME]['amount'];
export const selectIsOpen = (state) => state[REDUCER_NAME]['isOpen'];
export const selectInAmountProcess = (state) => state[REDUCER_NAME]['inAmountProcess'];
export const selectInProductProcess = (state) => state[REDUCER_NAME]['inProductProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
