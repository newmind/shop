'use strict';

import check from '../controllers/Identity/check';
import connect from '../controllers/Identity/connect';


export default (router) => {

  router
    .post('/v1/api/check', check())
    .post('/v1/api/connect', connect());
}
