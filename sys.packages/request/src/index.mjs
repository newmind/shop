
import { NetworkError } from '@packages/errors';

import axios from 'axios';


const defaultOptions = {
  method: 'get',
  url: '/',
  responseType: 'json',
  withCredentials: false,
};

const requestLogger = (config) => {

  const { url, method, params = null, data = null } = config;

  let requestData = null;

  if (params) {
    requestData = JSON.stringify(params);
  }

  if (data) {
    requestData = JSON.stringify(config['data']);
  }

  console.log(`[${method.toLocaleUpperCase()}] ---> "${url}" (${requestData})`);

  return config;
};

const responseLogger = (response) => {

  const { config: { url, method, responseType }, status, data = null } = response;

  let responseData = null;

  if (responseType === 'json' && data) {
    responseData = JSON.stringify(data);
  }

  console.log(`[${method.toLocaleUpperCase()}] <--- "${url}" [${status}] (${responseData})`);

  return response;
};

const errorLogger = (error) => {
  const {config: { url, method }, response } = error;

  let status = 0;
  let data = null;

  if(response){
    status = response['status'];
    if ('data' in response) {
      data = JSON.stringify(response.data);
    }
  }

  console.log(`[${method.toLocaleUpperCase()}] <--- "${url}" [${status}] (${data})`);

  if ('errno' in error) {
    if (error['errno'] === 'ECONNREFUSED') {
      return Promise.reject(new NetworkError(500, 'Сервис временно недоступен'));
    }
  }

  return Promise.reject(new NetworkError(error['status'], error['message']));
};


const request = async (options) => {

  options = {
    ...defaultOptions,
    ...options,
  };

  const instance = axios.create({
    ...options,
    timeout: 24000,
  });

  instance.interceptors.request.use(requestLogger, errorLogger);
  instance.interceptors.response.use(responseLogger, errorLogger);

  const result = await instance(options);

  return result['data'];
};

export default request;