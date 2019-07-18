
import {
  OPEN_CART_LIST,
  CLOSE_CART_LIST,

  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,

  RESTORE_CART,
  RESET_CART,
} from './types';


const initialState = {
  isOpen: false,
  items: [],
};


export const KEY = 'cart';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_CART_LIST: return {
      ...state,
      isOpen: true,
    };
    case CLOSE_CART_LIST: return {
      ...state,
      isOpen: false,
    };
    case ADD_PRODUCT_TO_CART: {
      const { localStorage } = window;
      const newItems = [
        ...state['items'],
        payload,
      ];

      localStorage.setItem('cart', JSON.stringify(newItems));

      return {
        ...state,
        items: newItems,
      };
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const itemIndex = state['items'].findIndex(item => item['id'] === payload);
      const newItems = [
        ...state['items'].slice(0, itemIndex),
        ...state['items'].slice(itemIndex + 1),
      ];

      localStorage.setItem('cart', JSON.stringify(newItems));

      return {
        ...state,
        items: newItems,
      };
    }

    case RESTORE_CART: return {
      ...state,
      items: payload,
    };
    case RESET_CART: return {
      ...state,
      items: [],
    };

    default: return state;
  }
}