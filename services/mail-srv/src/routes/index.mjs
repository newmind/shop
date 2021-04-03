
import { sendEmail } from '../controllers/index.mjs';


export default (router) => {

  router.post('/send/email', sendEmail());
};
