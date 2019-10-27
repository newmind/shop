
import { Dispatch } from 'redux';

import { pageInProcessAction } from './actions';


export const pageInProcess = (status: boolean) => (dispatch: Dispatch) => {
  dispatch(pageInProcessAction(status));
};
