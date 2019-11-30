
import {
  pageInProcessAction,
} from './actions';


export const pageInProcess = (state = true) => dispatch => {
  dispatch(pageInProcessAction(state));
};