
import { signIn } from '../controllers/User';


export default (router) => {
  router.post('/sign-in', signIn());
};
