
import { getImageByFileName } from '../controllers/Gallery';

import { create as createOperation, get as getOperationById } from '../controllers/Orders';

import { getProducts, getProductById } from '../controllers/Products';

import { createComment } from '../controllers/Comments';

import { getAllTypes } from '../controllers/Type';
import { getAllCategories } from '../controllers/Category';

import { getProfile, signUp, signIn } from '../controllers/Profile';


export default (router) => {

  router.get('/profile', getProfile());
  router.post('/sign-up', signUp());
  router.post('/sign-in', signIn());

  router.get('/products', getProducts());
  router.get('/products/:uuid', getProductById());

  router.get('/types', getAllTypes());
  router.get('/categories', getAllCategories());

  router.post('/products/:id/comments', createComment());

  router.get('/gallery/:fileName', getImageByFileName());

  router.post('/operations', createOperation());
  router.get('/operations/:externalId', getOperationById());
};
