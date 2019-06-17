
import axios from 'axios';

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

  const instance = axios.create({
    baseURL: process.env['REACT_APP_API_HOST'],
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'},
    withCredentials: true,
  });

  const { data } = await instance(options);

  return data;
};
