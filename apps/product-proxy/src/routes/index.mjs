'use strict';

import {
  getImageByName
} from '../controllers/Gallery/index';

import {
  getBrands,
  getProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} from '../controllers/Products';

import {
  getAll as getSubProducts,
  create as createSubProduct,
  getById as getSubProductById,
  updateById as updateSubProductById,
  deleteById as deleteSubProductById,
} from '../controllers/SubProducts';

import {
  getProducts as getStockProducts,
  getProductById as getStockProductById,
  createProduct as createStockProduct,
  deleteProductById as deleteStockProductById,
  updateProductById as updateStockProductById,
  createComment,
} from '../controllers/Stock';

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
  router.get('/v1/api/products/:productId', getProductById());
  router.put('/v1/api/products/:productId', updateProductById());
  router.delete('/v1/api/products/:productId', deleteProductById());

  router.get('/v1/api/sub-products', getSubProducts);
  router.post('/v1/api/sub-products', createSubProduct());
  router.get('/v1/api/sub-products/:productId', getSubProductById());
  router.put('/v1/api/sub-products/:productId', updateSubProductById());
  router.delete('/v1/api/sub-products/:productId', deleteSubProductById());

  router.get('/v1/api/gallery/:fileName', getImageByName());

  router.get('/v1/api/stock/products', getStockProducts());
  router.get('/v1/api/stock/products/:productId', getStockProductById());
  router.post('/v1/api/stock/products', createStockProduct());
  router.put('/v1/api/stock/products/:productId', updateStockProductById());
  router.delete('/v1/api/stock/products/:productId', deleteStockProductById());

  router.post('/v1/api/stock/products/:productId/comments', createComment());

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
