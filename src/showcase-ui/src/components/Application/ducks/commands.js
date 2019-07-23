
import { sleep } from '@ui.packages/utils';
import Cookies from 'js-cookie';
import { changeState } from './actions';


export const checkAuthState = () => async (dispatch) => {

  dispatch(changeState(true));

  const cookie = Cookies('agent');

  console.log(111, cookie);

  await sleep(200);

  dispatch(changeState(false));
};
