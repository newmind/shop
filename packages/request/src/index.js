
import axios from 'axios';
import Cookies from 'js-cookie';

const defaultOptions = {
  method: 'get',
  url: '/',
  responseType: 'json',
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

  const { data } = await instance(options);

  return data;
};
