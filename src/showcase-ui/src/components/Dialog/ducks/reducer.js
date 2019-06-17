
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './types';


const initialState = {
  isOpen: false,
  data: null,
};


export const KEY = 'dialog';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_DIALOG: return {
      ...state,
      isOpen: true,
      data: payload,
    };
    case CLOSE_DIALOG: return {
      ...state,
      isOpen: false,
      data: null,
    };
    default: return state;
  }
}