import { openDialogAction, closeDialogAction } from './actions';
export var openDialog = function openDialog(dialogName) {
  return function (dispatch) {
    dispatch(openDialogAction(dialogName));
  };
};
export var closeDialog = function closeDialog(dialogName) {
  return function (dispatch) {
    dispatch(closeDialogAction(dialogName));
  };
};