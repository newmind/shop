
import { NetworkError } from '@packages/errors';

import axios from 'axios';
import { push } from 'react-router-redux';


const defaultOptions = {
  method: 'get',
  url: '/',
  responseType: 'json',
};

let dispatch = null;
let hostApi = null;


export const middleware = (host) => (store) => (next) => (action) => {

  dispatch = store['dispatch'];
  hostApi = host;

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

  } catch(error) {

    if (error['response']) {

      const {status, data} = error['response'];

      if (status === 401) {
        dispatch(push('/sign-in'));
      }

      throw new NetworkError(status, data);

    } else {

      throw new NetworkError(500, { code: '1.0.0', message: 'Сервис временно не доступен' });
    }
  }
};

export default request;