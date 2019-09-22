
import {
  PAGE_IN_PROCESS,
} from './types';

const initialState = {
  inProcess: false,
};

export const KEY = 'page';


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PAGE_IN_PROCESS: return {
      inProcess: payload,
    };
    default: return state;
  }
}