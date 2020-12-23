
import {
  PAGE_IN_PROCESS,

  GET_USERS_REQUEST,
  GET_USERS_REQUEST_FAIL,
  GET_USERS_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (status = true) => ({
  type: PAGE_IN_PROCESS,
  payload: status,
});


export const getUsersRequestAction = () => ({ type: GET_USERS_REQUEST, payload: null, });
export const getUsersRequestFailAction = (error) => ({ type: GET_USERS_REQUEST_FAIL, error, });
export const getUsersRequestSuccessAction = (payload) => ({ type: GET_USERS_REQUEST_SUCCESS, payload, });
