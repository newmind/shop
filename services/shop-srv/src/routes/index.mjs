
import { getShops, createShops, updateShops, deleteShops } from '../controllers/shop';


export default (router) => {

  router.get('/v1/api/shops', getShops());
  router.post('/v1/api/shops', createShops());
  router.put('/v1/api/shops/:uuid', updateShops());
  router.delete('/v1/api/shops', deleteShops());
};
