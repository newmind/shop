
import {
  pageInProcessAction,
} from './actions';


export const setProcess = (state = true) => dispatch => {
  dispatch(pageInProcessAction(state));
};