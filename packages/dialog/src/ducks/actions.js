
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './types';


export const openDialogAction = (dialogName) => ({
  type: OPEN_DIALOG,
  payload: dialogName,
});


export const closeDialogAction = () => ({
  type: CLOSE_DIALOG,
});
