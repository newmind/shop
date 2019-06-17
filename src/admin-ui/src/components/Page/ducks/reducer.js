
import { SET_ACTIVE_PAGE } from './types';

const initialState = {
  inProcess: false,
};

export const KEY = 'page';


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_PAGE: {
      return {
        ...state,
        inProcess: payload,
      };
    }

    default: return { ...state };
  }
}