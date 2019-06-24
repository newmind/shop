'use strict';

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStatus,
  deleteProductById
} from '../controllers/Products';

import {
  addImages,
  getImageByFileName
} from '../controllers/Gallery';

import {
  getProducts as getStockProducts,
  create as createStockProduct,
  deleteProductById as deleteStockProductById,
  updateProduct as updateStockProductById,
} from '../controllers/Stock';

import {
  getAll as getCurrencies,
  create as createCurrency,
  deleteById as deleteCurrencyById,
  updateById as updateCurrencyById,
} from '../controllers/Currency';

import {
  getAll as getAllCategories,
  create as createCategory,
  deleteById as deleteCategoryById,
  // updateById as updateCurrencyById,
} from '../controllers/Category';

import {
  signIn,
} from '../controllers/User';

export default (router) => {

  router.get('/stock/products', getStockProducts());
  router.post('/stock/products', createStockProduct());
  router.put('/stock/products/:productId', updateStockProductById());
  router.delete('/stock/products/:productId', deleteStockProductById());

  router.get('/products', getProducts());
  router.get('/products/:productId', getProductById());
  router.post('/products', createProduct());
  router.put('/products/:productId', updateProduct());
  router.put('/products/:productId/status/:status', updateProductStatus());
  router.delete('/products/:productId', deleteProductById());

  router.get('/gallery/:fileName', getImageByFileName());
  router.post('/gallery', addImages());

  router.get('/currency', getCurrencies());
  router.post('/currency', createCurrency());
  router.put('/currency/:currencyId', updateCurrencyById());
  router.delete('/currency/:currencyId', deleteCurrencyById());

  router.get('/category', getAllCategories());
  router.post('/category', createCategory());
  // router.put('/currency/:currencyId', updateCurrencyById());
  router.delete('/category/:categoryId', deleteCategoryById());

  router.post('/sign-in', signIn());
};