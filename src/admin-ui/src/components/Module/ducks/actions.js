
import {
  PAGE_IN_PROCESS,
} from './types';


export const pageInProcessAction = (status) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});
