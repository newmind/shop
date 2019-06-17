'use strict';

import { getProducts, getProductById, createProduct, deleteProductById, updateProductById, updateProductStatusById } from '../controllers/Products/index';
import { getImageByName } from '../controllers/Gallery/index';


export default (router) => {

  router.get('/v1/api/products', getProducts());
  router.get('/v1/api/products/:productId', getProductById());
  router.post('/v1/api/products', createProduct());
  router.put('/v1/api/products/:productId', updateProductById());
  router.put('/v1/api/products/:productId/status/:status', updateProductStatusById());
  router.delete('/v1/api/products/:productId', deleteProductById());

  router.get('/v1/api/gallery/:fileName', getImageByName());
};