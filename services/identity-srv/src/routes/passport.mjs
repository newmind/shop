
import get from '../controllers/user/get.mjs';
import getAll from '../controllers/user/getAll/index.mjs';
import update from '../controllers/user/update.mjs';


export default (router) => {

  router
    .get('/v1/api/passport', getAll())
    .get('/v1/api/passport/:id', get())
    .put('/v1/api/passport/:id', update());
}
