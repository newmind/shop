'use strict';

import { getProducts, getProductById, getProductsAdditionalData, createComment } from '../controllers/Products';
import { getImageByFileName } from '../controllers/Gallery';


export default (router) => {

  router.get('/products/additional-data', getProductsAdditionalData());

  router.get('/products', getProducts());
  router.get('/products/:productId', getProductById());
  router.post('/products/:productId/comments', createComment());

  router.get('/gallery/:fileName', getImageByFileName());
};