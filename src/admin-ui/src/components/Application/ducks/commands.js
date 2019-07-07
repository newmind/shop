
import Cookies from 'js-cookie';
import { push } from 'react-router-redux';

import { sleep } from '@packages/utils';

import { changeState } from './actions';


export const changeInitial = (state) => async (dispatch) => {

  dispatch(changeState(state));
};

export const checkAuthState = () => async (dispatch) => {

  const cookies = Cookies.getJSON('admin');

  if ( ! cookies) {
    dispatch(push('/sign-in'));
  }

  await sleep(500);

  dispatch(changeInitial(false));
};
