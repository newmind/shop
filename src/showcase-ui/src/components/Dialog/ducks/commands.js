
import {
  closeDialogAction,
} from './actions';


export const closeDialog = () => dispatch => {
  dispatch(closeDialogAction());
};
