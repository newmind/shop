'use strict';

import { addImages, getImageByFileName } from '../controllers/Gallery';
import { getProducts, getProductById,  createProduct, updateProduct, updateProductStatus, deleteProductById } from '../controllers/Products';
import { getProducts as getStockProducts, create as createStockProduct, deleteProductById as deleteStockProductById, updateProduct as updateStockProductById } from '../controllers/Stock';

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
  signIn,
  get as getUser,
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

  router.get('/units', getUnits());
  router.post('/units', createUnit());
  router.put('/units/:unitId', updateUnitById());
  router.delete('/units/:unitId', deleteUnitById());

  router.get('/category', getAllCategories());
  router.post('/category', createCategory());
  router.put('/category/:categoryId', updateCategoryById());
  router.delete('/category/:categoryId', deleteCategoryById());

  router.post('/sign-in', signIn());
  router.get('/profile', getUser());
};