
import {
  APPLICATION_CHANGE_STATE,
} from './types';


export const changeState = state => {
  return{
    type: APPLICATION_CHANGE_STATE,
    payload: state,
  }
};
