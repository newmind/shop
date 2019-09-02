
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
    requestData = JSON.stringify(params)
  }

  if (data) {
    requestData = JSON.stringify(config['data'])
  }

  console.log(`[${method.toLocaleUpperCase()}] ---> "${url}" (${JSON.stringify(requestData)})`);

  return config;
};

const responseLogger = (response) => {

  const { config: { url, method }, status, data } = response;

  console.log(`[${method.toLocaleUpperCase()}] <--- "${url}" [${status}] (${JSON.stringify(data)})`);

  return response;
};

const errorLogger = (error) => {

  const {config: { url, method }, response } = error;

  let status, data;
  if(response){
    status = response.status;
    data = response.data;
  }

  console.log(`[${method.toLocaleUpperCase()}] <--- "${url}" [${status}] (${data})`);

  return error;
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
      timeout: 24000,
      headers: headers,
      withCredentials: options['withCredentials'],
    });

    instance.interceptors.request.use(requestLogger, errorLogger);
    instance.interceptors.response.use(responseLogger, errorLogger);

    const { data } = await instance(options);

    return data;

  } catch(error) {

    throw error['response'];
  }
};

export default request;