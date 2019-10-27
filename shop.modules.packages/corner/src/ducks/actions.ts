

import { PAGE_IN_PROCESS } from './types';


interface IAction {
  type: string,
  payload: any,
}


export const pageInProcessAction = (status: boolean): IAction => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});
