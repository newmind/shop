
import { getImageByFileName } from '../controllers/Gallery';

import { create as createOperation, get as getOperationById } from '../controllers/Orders';

import { getProducts, getProductById } from '../controllers/Products';

import { createComment } from '../controllers/Comments';

import { getAllCategories } from '../controllers/Category';


export default (router) => {

  router.get('/products', getProducts());
  router.get('/products/:uuid', getProductById());

  router.get('/categories', getAllCategories());

  router.post('/products/:id/comments', createComment());

  router.get('/gallery/:fileName', getImageByFileName());

  router.post('/operations', createOperation());
  router.get('/operations/:externalId', getOperationById());
};
