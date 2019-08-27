
import {
  setLoadingPageAction,
} from './actions';


export const setProcess = (state = true) => dispatch => {
  dispatch(setLoadingPageAction(state));
};