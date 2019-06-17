
import { APPLICATION_CHANGE_STATE } from './types';

const initialState = {
  isInitializing: true,
};

export const KEY = 'admin-ui-gw';


export default (state = initialState, { type, payload }) => {

  switch (type) {
    case APPLICATION_CHANGE_STATE: {
      return {
        ...state,
        isInitializing: payload,
      };
    }
    default: return state;
  }
}