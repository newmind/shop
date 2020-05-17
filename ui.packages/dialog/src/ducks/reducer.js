
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './types';


const initialState = {
  isOpen: false,
  name: null,
  data: null,
};


export const KEY = 'dialog';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_DIALOG: return {
      ...state,
      isOpen: true,
      name: payload['name'],
      data: payload['data'],
    };
    case CLOSE_DIALOG: return {
      ...state,
      isOpen: false,
      name: null,
      data: null,
    };

    default: return { ...state };
  }
}