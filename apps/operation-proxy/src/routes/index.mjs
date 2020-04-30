
import { getAllOrders, createOrder, updateOrder } from '../controllers/Operations';


export default (router) => {

  router.get('/v1/api/operations', getAllOrders());
  router.post('/v1/api/operations', createOrder());
  router.put('/v1/api/operations/:operationId', updateOrder());
};
