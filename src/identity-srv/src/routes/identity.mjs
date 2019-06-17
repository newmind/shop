'use strict';

import signIn from '../controllers/Identity/sign-in';
import signUp from '../controllers/Identity/sign-up';


export default (router) => {

  router
    .get('/sign-in', signIn())
    .post('/sign-up', signUp());
}
