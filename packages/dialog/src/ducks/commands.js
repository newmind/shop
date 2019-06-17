
import {
  openDialogAction,
  closeDialogAction,
} from './actions';


export const openDialog = (dialogName) => dispatch => {
  dispatch(openDialogAction(dialogName));
};

export const closeDialog = (dialogName) => dispatch => {
  dispatch(closeDialogAction(dialogName));
};
