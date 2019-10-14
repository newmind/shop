'use strict';

import { sendEmail } from '../controllers/index';


export default (router) => {

  router.get('/send', async () => {
    console.log(1111111)
  });
  router.post('/send', sendEmail());

  console.log('Router set');
};