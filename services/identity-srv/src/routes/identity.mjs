
import check from '../controllers/Identity/check.mjs';
import connect from '../controllers/Identity/connect.mjs';
import refresh from '../controllers/Identity/refresh.mjs';
import signUp from '../controllers/Identity/sign-up.mjs';


export default (router) => {

  router
    .post('/v1/api/check', check())
    .post('/v1/api/refresh', refresh())
    .post('/v1/api/connect', connect())
    .post('/v1/api/sign-up', signUp());
}
