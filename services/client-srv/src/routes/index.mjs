
import { getAllClients, createClient, deleteClients, updateClient } from '../controllers/Client';


export default (router) => {

  router.get('/v1/api/clients', getAllClients());
  router.post('/v1/api/clients', createClient());
  router.put('/v1/api/clients/:id', updateClient());
  router.delete('/v1/api/clients', deleteClients());
};
