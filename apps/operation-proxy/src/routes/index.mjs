
import { getAllOrders, createOrder, updateOrder } from '../controllers/Orders';
import { getAllStatuses, createStatus, updateStatus, deleteStatuses } from '../controllers/Statuses';


export default (router) => {

  router.get('/v1/api/operations', getAllOrders());
  router.post('/v1/api/operations', createOrder());
  router.put('/v1/api/operations/:externalId', updateOrder());

  router.get('/v1/api/statuses', getAllStatuses());
  router.post('/v1/api/statuses', createStatus());
  router.put('/v1/api/statuses/:statusId', updateStatus());
  router.delete('/v1/api/statuses', deleteStatuses());
};
