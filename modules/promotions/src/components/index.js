
import HOC from '@ui.packages/hoc';
import { on, off } from "@ui.packages/socket";

import Component from './Component';

import { getPromotions } from '../ducks/commands';
import {
  resetStateAction,

  createPromotionRequestSuccessAction,
  updatePromotionRequestSuccessAction,
  deletePromotionRequestSuccessAction,
} from '../ducks/slice';


export default HOC({
  onMount({ dispatch }) {

    dispatch(getPromotions());

    on(process.env['REACT_APP_SOCKET_PROMOTION_CREATE'], (data) => dispatch(createPromotionRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_PROMOTION_UPDATE'], (data) => dispatch(updatePromotionRequestSuccessAction(data)));
    on(process.env['REACT_APP_SOCKET_PROMOTION_DELETE'], (data) => dispatch(deletePromotionRequestSuccessAction(data)));
  },
  onUnmount({ dispatch }) {

    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_PROMOTION_CREATE']);
    off(process.env['REACT_APP_SOCKET_PROMOTION_UPDATE']);
    off(process.env['REACT_APP_SOCKET_PROMOTION_DELETE']);
  }
})(Component);
