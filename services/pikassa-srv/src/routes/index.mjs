
import { create } from '../controllers/operation';


export default (router) => {

  router.post('/v1/api/operation', create());
};
