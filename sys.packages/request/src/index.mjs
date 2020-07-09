
import logger from '@sys.packages/logger';
import {
  BadRequestError,
  NotAuthError,
  NotFoundError,
  ValidationError,
  NetworkError,
} from '@packages/errors';

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

  logger['info'](`[${method.toLocaleUpperCase()}] ---> "${url}" (${requestData})`);

  return config;
};

const responseLogger = (response) => {

  const { config: { url, method, responseType }, status, data = null } = response;

  let responseData = null;

  if (responseType === 'json' && data) {
    responseData = JSON.stringify(data);
  }

  logger['info'](`[${method.toLocaleUpperCase()}] <--- "${url}" [${status}] (${responseData})`);

  return response;
};

const errorLogger = (error) => {
  const { config: { url, method }, response } = error;

  let status = 0;
  let data = null;

  if (response) {
    status = response['status'];
    if ('data' in response) {
      data = JSON.stringify(response.data);
    }
  }

  logger['error'](`[${method.toLocaleUpperCase()}] <--- "${url}" [${status}] (${data})`);

  if ('errno' in error) {
    if (error['errno'] === 'ECONNREFUSED') {
      return Promise.reject(new NetworkError('Сервис временно недоступен'));
    }
  }

  if (response) {
    if (response['status'] === 400) {
      return Promise.reject(new BadRequestError(response['data']));
    }
    else if (response['status'] === 401) {
      return Promise.reject(new NotAuthError(response['data']));
    }
    else if (response['status'] === 404) {
      return Promise.reject(new NotFoundError(response['data']));
    }
    else if (response['status'] === 417) {
      return Promise.reject(new ValidationError(response['data']));
    }
    else {
      return Promise.reject(new NetworkError(response['data']));
    }
  }
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
