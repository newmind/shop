
import get from '../controllers/user/get';
import getAll from '../controllers/user/getAll';
import update from '../controllers/user/update';


export default (router) => {

  router
    .get('/v1/api/passport', getAll())
    .get('/v1/api/passport/:id', get())
    .put('/v1/api/passport/:id', update());
}
