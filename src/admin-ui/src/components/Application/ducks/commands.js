
import { sleep } from '@ui.packages/utils';

import { changeState } from './actions';


export const changeInitial = (state) => async (dispatch) => {

  dispatch(changeState(state));
};

export const checkAuthState = () => async (dispatch) => {

  await sleep(500);

  dispatch(changeInitial(false));
};
