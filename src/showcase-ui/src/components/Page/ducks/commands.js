
import { setActivePage } from './actions';


export const setPage = state => dispatch => {
  dispatch(setActivePage(state));
};
