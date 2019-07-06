
import {
  CREATE_TABS,
  REMOVE_TABS,

  SET_ACTIVE_TAB,
} from './types';


const initialState = {
  tabs: {
    'default': {
      activeTab: '',
    }
  },
};


export const KEY = 'tabs';

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case CREATE_TABS: return {
      ...state,
      tabs: {
        ...state['tabs'],
        [payload['name']]: {
          activeTab: payload['tabName'],
        }
      },
    };

    case REMOVE_TABS: {
      const tabs = state['tabs'];
      delete tabs[payload];
      return {
        ...state,
        tabs: {
          ...tabs
        },
      };
    }

    case SET_ACTIVE_TAB: return {
      ...state,
      tabs: {
        ...state['tabs'],
        [payload['tabsName']]: {
          activeTab: payload['tabName'],
        }
      }
    };

    default: return { ...state };
  }
}