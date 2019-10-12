'use strict';

import { getProducts, getProductById, getProductsAdditionalData, createComment } from '../controllers/Products';
import { getImageByFileName } from '../controllers/Gallery';
import { create as createOperation } from '../controllers/Operation';
import { get as getLenses } from '../controllers/Lenses';


export default (router) => {

  router.get('/products/additional-data', getProductsAdditionalData());

  router.get('/products', getProducts());
  router.get('/products/:productId', getProductById());
  router.post('/products/:productId/comments', createComment());

  router.get('/gallery/:fileName', getImageByFileName());

  router.post('/operation', createOperation());

  router.get('/lenses', getLenses());
};