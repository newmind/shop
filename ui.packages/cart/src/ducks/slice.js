
import { isJSON } from '@ui.packages/utils';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  uuid: [],
  items: [],
  amount: null,
  isOpen: false,
  inProcess: false,
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
      state['items'] = [];
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
    },

    getProductsRequestAction(state) {
      state['inProcess'] = true;
    },
    getProductsRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getProductsRequestSuccessAction(state, { payload }) {
      state['items'] = payload;
      state['inProcess'] = false;
    },

    getAmountRequestAction(state) {
      state['inProcess'] = true;
    },
    getAmountRequestFailAction(state) {
      state['inProcess'] = false;
    },
    getAmountRequestSuccessAction(state, { payload }) {
      state['amount'] = payload;
      state['inProcess'] = false;
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
export const selectInProcess = (state) => state[REDUCER_NAME]['inProcess'];

export const name = slice['name'];
export const reducer = slice['reducer'];
