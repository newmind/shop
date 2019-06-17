import { OPEN_DIALOG, CLOSE_DIALOG } from './types';
export var openDialogAction = function openDialogAction(dialogName) {
  return {
    type: OPEN_DIALOG,
    payload: dialogName
  };
};
export var closeDialogAction = function closeDialogAction() {
  return {
    type: CLOSE_DIALOG
  };
};