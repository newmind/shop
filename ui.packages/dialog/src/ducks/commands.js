
import {
  openDialogAction,
  closeDialogAction,
} from './actions';


export const openDialog = (dialogName, data) => (dispatch) => {
  dispatch(openDialogAction(dialogName, data));
};

export const closeDialog = (dialogName) => (dispatch) => {
  dispatch(closeDialogAction(dialogName));
};
