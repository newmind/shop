
import { getAllStatuses } from '../controllers/status';
import { getAllPayments, updatePayment } from '../controllers/payment';
import { getAllDeliveries, updateDelivery } from '../controllers/delivery';

import { getAllOrders, createOrder, updateOrder } from '../controllers/orders';

import { getAllAmounts } from '../controllers/amount';


export default (router) => {

  router.post('/v1/api/amounts', getAllAmounts());

  router.get('/v1/api/deliveries', getAllDeliveries());
  router.put('/v1/api/deliveries/:code', updateDelivery());

  router.get('/v1/api/payments', getAllPayments());
  router.put('/v1/api/payments/:code', updatePayment());

  router.get('/v1/api/operations/statuses', getAllStatuses());

  router.get('/v1/api/operations', getAllOrders());
  router.post('/v1/api/operations', createOrder());
  router.put('/v1/api/operations/:externalId', updateOrder());
};
