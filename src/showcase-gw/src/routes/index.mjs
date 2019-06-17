'use strict';

import { getProducts, getProductById, getProductsAdditionalData } from '../controllers/Products/index';
import { getImageByFileName } from '../controllers/Gallery/index';


export default (router) => {

  router.get('/products/additional-data', getProductsAdditionalData());

  router.get('/products', getProducts());
  router.get('/products/:productId', getProductById());

  router.get('/gallery/:fileName', getImageByFileName());
};