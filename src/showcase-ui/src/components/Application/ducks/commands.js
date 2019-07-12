
import { sleep } from '@ui.packages/utils';
// import { getCookie } from 'redux-cookie';
import { changeState } from './actions';


export const checkAuthState = () => async (dispatch) => {

  dispatch(changeState(true));

  // const cookie = dispatch(getCookie('state'));

  await sleep(1000);

  dispatch(changeState(false));
};
