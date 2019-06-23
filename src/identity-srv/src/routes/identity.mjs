'use strict';

import signIn from '../controllers/Identity/sign-in';
import signUp from '../controllers/Identity/sign-up';
import check from '../controllers/Identity/check';


export default (router) => {

  router
    .post('/check', check())
    .post('/sign-in', signIn())
    .post('/sign-up', signUp());
}
