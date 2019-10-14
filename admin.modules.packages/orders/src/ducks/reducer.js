
import {
  SIGN_OUT,
} from './types';

const initialState = {};

export default (state = initialState, { type }) => {
  switch (type) {
    case SIGN_OUT: return {
      ...initialState,
    };
    default: return state;
  }
}