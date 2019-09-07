
import {
  PAGE_IN_PROCESS,
} from './types';


export const pageInProcess = (status = true) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});