
import axios from 'axios';
import Cookies from 'js-cookie';

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

export default async (options) => {
  try {
    options = {
      ...defaultOptions,
      ...options,
    };

    console.log(3333, options);

    let cookies = Cookies.get('admin');
    let headers = {};

    if (options['headers']) {
      headers = options['headers'];
    }

    console.log(4444, cookies);

    if (cookies) {
      const cookiesContent = JSON.parse(cookies);
      headers['Authorization'] = cookiesContent['token'];
    }

    console.log(5555, headers);

    const instance = axios.create({
      baseURL: hostApi,
      timeout: 24000,
      headers: headers,
      withCredentials: false,
    });

    console.log(6666, instance);

    const { data } = await instance(options);

    return data;

  } catch(error) {
    const { status } = error['response'];

    console.log(111, error);

    if (status === 401) {
      dispatch(push('/sign-in'));
    }
  }
};
