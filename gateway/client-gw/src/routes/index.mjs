
import { getImageByFileName } from '../controllers/Gallery/index.mjs';

import { create as createOperation, get as getOperationById } from '../controllers/Orders/index.mjs';

import { getProducts, getProductById } from '../controllers/Products/index.mjs';

import { createComment } from '../controllers/Comments/index.mjs';

import { getAllTypes } from '../controllers/Type/index.mjs';
import { getAllCategories } from '../controllers/Category/index.mjs';

import { getProfile, signUp, signIn, signOut } from '../controllers/Profile/index.mjs';


export default (router) => {

  router.get('/profile', getProfile());
  router.post('/sign-up', signUp());
  router.post('/sign-in', signIn());
  router.post('/sign-out', signOut());

  router.get('/products', getProducts());
  router.get('/products/:uuid', getProductById());

  router.get('/types', getAllTypes());
  router.get('/categories', getAllCategories());

  router.post('/products/:id/comments', createComment());

  router.get('/gallery/:fileName', getImageByFileName());

  router.post('/operations', createOperation());
  router.get('/operations/:externalId', getOperationById());
};
