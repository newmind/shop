
import { getAllStatuses } from '../controllers/status';
import { getAllPayments } from '../controllers/payment';
import { getAllDeliveries } from '../controllers/delivery';

import { getAllOrders, createOrder, updateOrder } from '../controllers/orders';


export default (router) => {

  router.get('/v1/api/operations/deliveries', getAllDeliveries());

  router.get('/v1/api/operations/payments', getAllPayments());

  router.get('/v1/api/operations/statuses', getAllStatuses());

  router.get('/v1/api/operations', getAllOrders());
  router.post('/v1/api/operations', createOrder());
  router.put('/v1/api/operations/:externalId', updateOrder());
};
