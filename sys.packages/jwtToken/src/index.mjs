'use strict';

import request from "axios";
import jwt from 'jsonwebtoken';

import { CustomError } from '@packages/errors';


class NotAuthorize extends CustomError {
  constructor(status, data) {
    super(data);

    this.name = NotAuthorize.name;
    this.status = status;

    Error.captureStackTrace(this, NotAuthorize);
  }
}


const getCookie = async (ctx, name) => {

  const cookies = ctx['cookie'] || {};
  const cookie = cookies[name] || null;

  if ( ! cookie) {
    throw new NotAuthorize(401, { code: '', message: 'User not authorize' });
  }

  return JSON.parse(decodeURIComponent(cookie));
};

const checkCookie = async (cookie, { serviceUrl }) => {
  try {

    const { data } = await request({
      url: `${serviceUrl}/check`,
      method: 'post',
      data: cookie,
    });

    return {
      status: 200,
      data: data,
    };

  } catch(error) {

    const { response } = error;
    const { status } = response;

    return {
      status: status,
      data: null,
    };
  }
};

const refreshToken = async (cookie, { serviceUrl }) => {
  try {

    const { data } = await request({
      url: `${serviceUrl}/refresh`,
      method: 'post',
      data: cookie,
    });

    return {
      status: 200,
      data: data['data'],
    };

  } catch(error) {

    return {
      status: 500,
      data: null,
    };
  }
};


export default (options) => async (ctx, next) => {

  const { name, serviceUrl } = options;

  try {

    const cookie = await getCookie(ctx, name);
    const { status, data } = await checkCookie(cookie, { serviceUrl });

    let userData = data;

    if (status === 400) {
      const { data } = await refreshToken(cookie, { serviceUrl });

      ctx.cookies.set(name, encodeURIComponent(JSON.stringify(data)), {
        httpOnly: true,
      });

      userData = data;
    }

    ctx.user = userData['data'];

    return next();

  } catch(error) {

    if (error instanceof NotAuthorize) {
      ctx.status = 401;
      return ctx.body = {
        success: true,
        data: error['data'],
      };
    }

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '',
        message: error['message']
      },
    };
  }
};

export const decode = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
