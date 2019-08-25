
import {
  CHANGE_STATE,
} from './types';


export const changeState = state => {
  return{
    type: CHANGE_STATE,
    payload: state,
  }
};


