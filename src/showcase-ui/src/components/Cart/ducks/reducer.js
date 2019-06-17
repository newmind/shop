
import {
  OPEN_CART_LIST,
  CLOSE_CART_LIST,

  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
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
      return {
        ...state,
        items: [
          ...state['items'],
          payload,
        ],
      };
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const itemIndex = state['items'].findIndex(item => item['id'] === payload);
      return {
        ...state,
        items: [
          ...state['items'].slice(0, itemIndex),
          ...state['items'].slice(itemIndex + 1)
        ],
      };
    }
    default: return state;
  }
}