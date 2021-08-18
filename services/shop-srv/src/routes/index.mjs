
import { getShops, createShops, updateShops, deleteShops } from '../controllers/shop';
import { getDeliveries } from '../controllers/delivery';
import { getPayments } from '../controllers/payment';


export default (router) => {

  router.get('/v1/api/shops', getShops());
  router.post('/v1/api/shops', createShops());
  router.put('/v1/api/shops/:uuid', updateShops());
  router.delete('/v1/api/shops', deleteShops());

  router.get('/v1/api/deliveries', getDeliveries());

  router.get('/v1/api/payments', getPayments());
};
