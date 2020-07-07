
import {BadRequestError, NetworkError, NotAuthError, NotFoundError, ValidationError} from '@packages/errors';

import axios from 'axios';
import { push } from 'react-router-redux';


const defaultOptions = {
  method: 'get',
  url: '/',
  responseType: 'json',
  silent: false,
};

let dispatch = null;
let hostApi = null;


export const middleware = (options) => (store) => (next) => (action) => {

  dispatch = store['dispatch'];
  hostApi = options['host'];

  defaultOptions['silent'] = options['silent'] || false;

  return next(action);
};

const request = async (options) => {
  try {
    options = {
      ...defaultOptions,
      ...options,
    };

    let headers = {};

    if (options['headers']) {
      headers = options['headers'];
    }

    const instance = axios.create({
      baseURL: hostApi,
      timeout: 24000,
      headers: headers,
      withCredentials: true,
    });

    const { data } = await instance(options);

    return data;
  }
  catch(error) {
    if (error['response']) {
      const { status, data } = error['response'];

      if ( ! options['silent']) {
        if (status === 401) {
          dispatch(push('/sign-in'));
        }
      }

      if (status === 400) {
        return Promise.reject(new BadRequestError(data));
      }
      else if (status === 401) {
        return Promise.reject(new NotAuthError(data));
      }
      else if (status === 404) {
        return Promise.reject(new NotFoundError(data));
      }
      else if (status === 417) {
        return Promise.reject(new ValidationError(data));
      }
      else {
        return Promise.reject(new NetworkError(data));
      }
    }
    else {

      throw new NetworkError({ code: '1.0.0', message: 'Сервис временно не доступен' });
    }
  }
};

export default request;
