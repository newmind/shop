
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './types';


export const openDialogAction = (dialogName, data = null) => ({
  type: OPEN_DIALOG,
  payload: {
    name: dialogName,
    data: data,
  },
});


export const closeDialogAction = () => ({
  type: CLOSE_DIALOG,
});
