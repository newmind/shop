'use strict';

import get from '../controllers/user/get';
import update from '../controllers/user/update';


export default (router) => {

  router
    .get('/v1/api/passport/:id', get())
    .put('/v1/api/passport/:id', update());
}
