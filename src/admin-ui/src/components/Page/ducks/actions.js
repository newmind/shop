
import {
  SET_ACTIVE_PAGE,
} from './types';


export const setActivePage = pageName => ({
  type: SET_ACTIVE_PAGE,
  payload: pageName,
});
