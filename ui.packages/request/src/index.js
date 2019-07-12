
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

    const { status } = error['response'];

    if (status === 401) {
      dispatch(push('/sign-in'));
    }

    throw error['response'];
  }
};

export default request;