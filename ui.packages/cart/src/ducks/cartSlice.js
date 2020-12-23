
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isOpen: false,
  items: [],
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state['isOpen'] = true;
    },
    closeCart: (state) => {
      state['isOpen'] = false;
    },
    addProductToCart: (state, { payload }) => {
      const { localStorage } = window;
      const item = {
        ...payload,
        goal: null,
        type: 'on-prescription',
        productType: (payload['params'] === 'further') ? 'on-prescription' : null,
        recipe: null,
        lens: null,
        file: null,
      };
      const newItems = [
        ...state['items'],
        item,
      ];

      state['items'] = newItems;
      localStorage.setItem('cart', JSON.stringify(newItems));
    },
    removeProductFromCart: (state, { payload }) => {
      const itemIndex = state['items'].findIndex(item => item['uuid'] === payload);
      const newItems = [
        ...state['items'].slice(0, itemIndex),
        ...state['items'].slice(itemIndex + 1),
      ];

      state['items'] = newItems;
      localStorage.setItem('cart', JSON.stringify(newItems));
    },
    restoreCart: (state) => {
      const store = localStorage.getItem('cart');
      state['items'] = JSON.parse(store);
    },
    resetCart: (state) => {
      state['items'] = [];
      localStorage.clear();
    }
  },
});

export const { openCart, closeCart, addProductToCart, removeProductFromCart, restoreCart, resetCart } = cartSlice['actions'];

export const selectItems = (state) => state['cart']['items'];
export const selectIsOpen = (state) => state['cart']['isOpen'];

export const reducer = cartSlice['reducer'];
