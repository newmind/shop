
import { sendEmail } from '../controllers/index';


export default (router) => {

  router.post('/send/email', sendEmail());

  console.log('Router set');
};