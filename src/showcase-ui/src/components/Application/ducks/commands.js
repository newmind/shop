
import { sleep } from '@ui.packages/utils';
import { changeState } from './actions';


export const checkAuthState = () => async (dispatch) => {

  dispatch(changeState(true));

  await sleep(600);

  dispatch(changeState(false));
};
