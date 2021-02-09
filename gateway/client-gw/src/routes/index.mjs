
import { getImageByFileName } from '../controllers/Gallery';

import { create as createOperation, get as getOperationById } from '../controllers/Orders';

import { getProducts, getProductById, getProductsAmount } from '../controllers/Products';

import { createComment } from '../controllers/Comments';

import { getAllTypes } from '../controllers/Type';
import { getAllCategories } from '../controllers/Category';

import { getProfile, signUp, signIn, signOut } from '../controllers/Profile';

import { getAllPayments } from '../controllers/payment';
import { getAllDeliveries } from '../controllers/delivery';


export default (router) => {

  router.get('/profile', getProfile());
  router.post('/sign-up', signUp());
  router.post('/sign-in', signIn());
  router.post('/sign-out', signOut());

  router.get('/products', getProducts());
  router.get('/products/:uuid', getProductById());
  router.post('/products/amount', getProductsAmount());
  router.post('/products/:id/comments', createComment());

  router.get('/types', getAllTypes());
  router.get('/categories', getAllCategories());

  router.get('/gallery/:fileName', getImageByFileName());

  router.get('/operations/payments', getAllPayments());
  router.get('/operations/deliveries', getAllDeliveries());

  router.post('/operations', createOperation());
  router.get('/operations/:externalId', getOperationById());
};
