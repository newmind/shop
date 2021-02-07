
import { getAllClients, createClient, deleteClients, updateClient } from '../controllers/Client';


export default (router) => {

  router.get('/v1/api/customers', getAllClients());
  router.post('/v1/api/customers', createClient());
  router.put('/v1/api/customers/:id', updateClient());
  router.delete('/v1/api/customers', deleteClients());
};
