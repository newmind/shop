
import {
  SET_LOADING_PAGE,
} from './types';

const initialState = {
  inProcess: true,
};

export const KEY = 'module';


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_PAGE: {
      return {
        ...state,
        inProcess: payload,
      };
    }
    default: return state;
  }
}