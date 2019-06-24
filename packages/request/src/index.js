
import axios from 'axios';
import Cookies from 'js-cookie';

import { push } from 'react-router-redux';

const defaultOptions = {
  method: 'get',
  url: '/',
  responseType: 'json',
};

let dispatch = null;


export const middleware = () => (store) => (next) => (action) => {

  dispatch = store['dispatch'];

  return next(action);
};

export default async (options) => {

  options = {
    ...defaultOptions,
    ...options,
  };

  let cookies = Cookies.get('admin');
  if (cookies) {
    cookies = JSON.parse(cookies);
  }

  const instance = axios.create({
    baseURL: process.env['REACT_APP_API_HOST'],
    timeout: 1000,
    headers: {
      'Authorization': cookies && cookies['token'],
    },
    withCredentials: true,
  });

  try {

    const { data } = await instance(options);

    return data;

  } catch(error) {
    const { status } = error['response'];

    if (status === 401) {
      dispatch(push('/sign-in'));
    }
  }
};
