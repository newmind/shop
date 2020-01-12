'use strict';

import {
  getImageByName
} from '../controllers/Gallery/index';

import {
  create as createComment,
} from '../controllers/Comments';

import {
  getBrands,
  getProducts,
  createProduct,
  deleteProductById,
  updateProductById,
} from '../controllers/Products';

import {
  getAll as getCurrencies,
  create as createCurrency,
  deleteById as deleteCurrencyById,
  updateById as updateCurrencyById,
} from '../controllers/Currency';

import {
  getAll as getUnits,
  create as createUnit,
  deleteById as deleteUnitById,
  updateById as updateUnitById,
} from '../controllers/Units';

import {
  getAll as getAllCategories,
  create as createCategory,
  deleteById as deleteCategoryById,
  updateById as updateCategoryById,
} from '../controllers/Category';

import {
  getAll as getAllOperations,
  create as createOperation,
  updateById as updateOperationById,
} from '../controllers/Operations';



export default (router) => {

  router.get('/v1/api/products', getProducts());
  router.post('/v1/api/products', createProduct());
  router.put('/v1/api/products/:productId', updateProductById());
  router.delete('/v1/api/products/:productId', deleteProductById());

  router.get('/v1/api/gallery/:fileName', getImageByName());


  router.post('/v1/api/products/:productId/comments', createComment());

  router.get('/v1/api/currency', getCurrencies());
  router.post('/v1/api/currency', createCurrency());
  router.put('/v1/api/currency/:currencyId', updateCurrencyById());
  router.delete('/v1/api/currency/:currencyId', deleteCurrencyById());

  router.get('/v1/api/units', getUnits());
  router.post('/v1/api/units', createUnit());
  router.put('/v1/api/units/:unitId', updateUnitById());
  router.delete('/v1/api/units/:unitId', deleteUnitById());

  router.get('/v1/api/brands', getBrands());

  router.get('/v1/api/category', getAllCategories());
  router.post('/v1/api/category', createCategory());
  router.put('/v1/api/category/:categoryId', updateCategoryById());
  router.delete('/v1/api/category/:categoryId', deleteCategoryById());

  router.get('/v1/api/operations', getAllOperations());
  router.post('/v1/api/operations', createOperation());
  router.put('/v1/api/operations/:operationId', updateOperationById());
};
